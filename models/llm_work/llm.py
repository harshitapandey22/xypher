import langchain
from openai import OpenAI
from langchain_core.prompts import ChatPromptTemplate
#from langchain.embeddings import HuggingFaceEmbeddings
#from langchain.vectorstores import Chroma
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()

#embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/paraphrase-MiniLM-L3-v2")
  
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.getenv("OPENROUTER_API_KEY")
    )

#db = Chroma(
#    collection_name="remember_collection",
#    embedding_function=embedding_model,
#    persist_directory="./chroma_store"
#)
#
#def add_text(query, user):
#    db.add_texts(
#        texts = [query],
#        metadatas=[{"author": user,"timestamp": datetime.utcnow().isoformat()}]
#    )
#
#def return_all_from(user):
#    results = db.get(where={"author": user})
#    for items in results:
#        combined = list(zip(results['documents'],results['metadatas']))
#    sorted_by_time = sorted(combined, key=lambda x: x[1]["timestamp"], reverse=True)
#    return sorted_by_time
#
#def return_last_three(user):
#    messages = []
#    sorted_by_time = return_all_from(user)
#    if sorted_by_time is None:
#        return "None"
#        
#    flag = 0
#    for text, meta in sorted_by_time:
#        messages.append(text)
#        if flag == 2:
#            break
#        flag += 1
#    return messages

system_template = f"""
You are a financial advisor. You are only allowed to provide financial advice and nothing else, except when the user asks about their previous messages or conversation history.

Always think step-by-step internally, but never show your reasoning unless asked. Only show the final answer.

You are a helpful, knowledgeable financial advisor who speaks in the first person.

Your task is to answer the user's current question clearly, intelligently, and concisely. Provide focused and practical financial advice that directly relates to the question. You may include brief examples or context if it helps the user understand.

Keep your response **concise and to the point** — typically within 3 to 5 sentences. Only go longer if absolutely necessary to fully answer the question.

If the user's question is **not related to financial topics**, politely say:
"I'm here to help with financial questions. Feel free to ask me anything related to finance!"

However, if the user is asking about their previous messages, conversation history, or system-level interactions, you may assist them in retrieving or summarizing their recent messages, even if it's not strictly financial.

You may be given:

1. **User Transaction History (optional):**  
Transaction history:
{{user_transaction_history}}

⚡️ Only use the transaction history **if it is provided** (i.e., it is not "not given by the user") and **use it to provide financial advice for the current question give more emphasis to description.**  
If it is not provided, or not needed to answer the question, completely ignore it.

If the current question does **not** reference the recent messages, **ignore them** completely in your response.

Focus only on the user's current question:
“{{text}}”

Begin your answer after this line. Respond naturally, clearly, and concisely using "I" if referring to yourself.
"""

async def return_answer(query, user, isAllowed, ifTransactions):
    print(ifTransactions)
    current_question = query
    user = user
    #add_text(current_question,user)

    prompt_template = ChatPromptTemplate.from_messages(
        [("system", system_template), ("user", "{text}")]
    )

    if isAllowed == True:
        print("transaction history given!")
        final_prompt = prompt_template.format_messages(
        #last_user_messages=return_last_three(user),
        user_transaction_history=ifTransactions,
        text=current_question
    )
    else:
        print("transaction history not given!")
        final_prompt = prompt_template.format_messages(
        #last_user_messages=return_last_three(user),
        user_transaction_history="not given by the user",
        text=current_question
    )

    response = client.chat.completions.create(
    model="meta-llama/llama-4-maverick:free",
    messages=[{"role": "user", "content": str(final_prompt)}],
    temperature = 0.9
    )

    if response and hasattr(response, 'choices') and len(response.choices) > 0:
        print(response.choices[0].message.content)
        return(response.choices[0].message.content)
    else:
        print("Sorry, I couldn't generate a response at this time.")
        return("Sorry, I couldn't generate a response at this time.")
    