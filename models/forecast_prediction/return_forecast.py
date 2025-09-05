import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
import joblib
from datetime import datetime, timedelta
import plotly.graph_objects as go
from plotly.subplots import make_subplots
import json
import calendar


model = load_model('test_try.h5')
scaler = StandardScaler()

value = 18
def return_forecast(initial_balance, transactions):
    base_balance = initial_balance
    total_amount = base_balance

    amounts = [tran.amount for tran in transactions]
    dates   = [tran.date for tran in transactions]
    types   = [tran.type for tran in transactions]
    data_combined = list(zip(dates, amounts, types))

    data_combined.sort(key=lambda x: datetime.fromisoformat(x[0]))

    #for date, amount, types in data_combined:
        #print(f"Date: {date}, Amount: {amount}, Type: {types}")

    remember_date = data_combined[0][0]
    current_day_balance = base_balance
    data_final = []
    individual_dates = []
    for date, amount, types in data_combined:
        if remember_date != date:
            data_final.append(current_day_balance)
            individual_dates.append(remember_date)
            remember_date = date

        if types == 'expense':
            current_day_balance -= amount
        elif types == 'income':
            current_day_balance += amount

    data_final.append(current_day_balance)
    individual_dates.append(remember_date)

    individual_dates = [date[:10] for date in individual_dates]

    while len(individual_dates) < 18:
        first_date = datetime.strptime(individual_dates[0], '%Y-%m-%d')
        previous_date = (first_date - timedelta(days=1)).strftime('%Y-%m-%d')
        individual_dates.insert(0, previous_date) 

    #print([data_final,individual_dates])
    data_final = [round(data) for data in data_final]
    while len(data_final) < 18:
        data_final.insert(0, 0)

    original_data = data_final
    data_final = np.array(data_final[:18])
    data_final = data_final.reshape(-1, 1)
    data_final = scaler.fit_transform(data_final)
    data_final = data_final.flatten()

    #print(data_final)
    def predict_next_10(last_three):
        save_predictions = []
        #print(last_three)
        for i in range(30):
            #print(last_three)
            array_sent = np.array(last_three)
            array_sent = array_sent.reshape(1,value,1)

            prediction = model.predict(array_sent)
            prediction_saved = prediction[0][0]
            last_three = np.append(last_three[1:], prediction_saved)
            save_predictions.append(prediction_saved)
        return(save_predictions)

    predictions_further = predict_next_10(data_final)
    #print(predictions_further)
    predictions_further = np.array(predictions_further, dtype=float).reshape(1, -1)
    predictions_further = scaler.inverse_transform(predictions_further).flatten()

    #print(individual_dates)
    dates = [item for item in individual_dates if isinstance(item, str)]
    last_date = dates[-1]
    last_date = datetime.strptime(last_date, '%Y-%m-%d')

    next_10_dates = [(last_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(1, 11)]
    next_30_dates = [(last_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(1, 31)]
    #print(next_10_dates)


    # date_setup
    index_1 = individual_dates
    index_2 = next_10_dates

    # Flatten the nested arrays
    data_final_inverse = original_data  

    #print(data_final_inverse)
    day_balance_flat = [item[0] if isinstance(item, (list, np.ndarray)) else item for item in data_final_inverse]
    predictions_flat = [item[0] if isinstance(item, (list, np.ndarray)) else item for item in predictions_further[:10]]

    print(day_balance_flat)
    print(predictions_flat)
    print(index_1)
    print(index_2)

    dates = [datetime.strptime(date, "%Y-%m-%d") if isinstance(date, str) else date for date in next_30_dates]

    month_to_dates = {}

    # Group dates by (year, month)
    for i, date in enumerate(dates):
        key = (date.year, date.month)
        if key not in month_to_dates:
            month_to_dates[key] = []
        month_to_dates[key].append((date, i))  # Store date and its index

    month_end_predictions = []

    for key in sorted(month_to_dates.keys()):
        year, month = key
        last_day = calendar.monthrange(year, month)[1]

        found = None
        for date, idx in month_to_dates[key]:
            if date.day == last_day:
                found = idx
                break

        if found is None:
            found = max(month_to_dates[key], key=lambda x: x[0])[1]

        month_end_predictions.append((dates[found].strftime("%Y-%m-%d"), predictions_further[found]))

    # Create the interactive plotly figure
    fig = go.Figure()

    # Add actual balance trace
    fig.add_trace(go.Scatter(
        x=index_1,
        y=day_balance_flat,
        mode='lines+markers',
        name='Day Wise Balance',
        line=dict(
            color='#9370DB',  # Purple color
            width=3,
            shape='spline'
        ),
        marker=dict(
            color='#9370DB',
            size=6,
            line=dict(color='#D8BFD8', width=1)  # Lavender border
        ),
        hovertemplate='<b>Day %{x}</b><br>' +
                      'Balance: ₹%{y:,.2f}<br>' +
                      '<extra></extra>',
        connectgaps=True
    ))

    # Add predictions trace
    fig.add_trace(go.Scatter(
        x=index_2[:10],
        y=predictions_flat[:10],
        mode='lines+markers',
        name='Predictions',
        line=dict(
            color='#c5f15c',  # Medium Purple
            width=3,
            dash='dash',
            shape='spline'
        ),
        marker=dict(
            color='#c5f15c',
            size=6,
            line=dict(color='#D8BFD8', width=1)
        ),
        hovertemplate='<b>Day %{x}</b><br>' +
                      'Predicted: ₹%{y:,.2f}<br>' +
                      '<extra></extra>'
    ))

    # Add connecting line between actual and predictions
    fig.add_trace(go.Scatter(
        x=[index_1[-1], index_2[0]],
        y=[day_balance_flat[-1], predictions_flat[0]],
        mode='lines',
        line=dict(
            color='#c5f15c',
            width=2,
            dash='dash'
        ),
        showlegend=False,
        hoverinfo='skip'
    ))

    # Update layout with purple dashboard theme
    fig.update_layout(
        plot_bgcolor='#2E3137',
        paper_bgcolor='#2E3137',
        xaxis=dict(
            title=dict(
                text='<b>Time Period (Days)</b>',
                font=dict(color='#D8BFD8', size=14)
            ),
            gridcolor='rgba(216, 191, 216, 0.2)',
            gridwidth=1,
            tickfont=dict(color='#D8BFD8', size=12),
            linecolor='rgba(216, 191, 216, 0.3)',
            linewidth=2,
            showspikes=True,
            spikecolor='#D8BFD8',
            spikethickness=1,
            spikedash='dot'
        ),
        yaxis=dict(
            title=dict(
                text='<b>Balance Amount (₹)</b>',
                font=dict(color='#D8BFD8', size=14)
            ),
            gridcolor='rgba(216, 191, 216, 0.2)',
            gridwidth=1,
            tickfont=dict(color='#D8BFD8', size=12),
            tickformat='₹,.0f',
            linecolor='rgba(216, 191, 216, 0.3)',
            linewidth=2,
            showspikes=True,
            spikecolor='#D8BFD8',
            spikethickness=1,
            spikedash='dot'
        ),
        legend=dict(
            bgcolor='rgba(46, 49, 55, 0.8)',
            bordercolor='rgba(216, 191, 216, 0.5)',
            borderwidth=1,
            font=dict(color='#D8BFD8', size=12),
            x=0.02,
            y=0.98
        ),
        hoverlabel=dict(
            bgcolor='#2E3137',
            bordercolor='#D8BFD8',
            font=dict(color='#D8BFD8', size=12),
            align='left'
        ),
        font=dict(family='Arial', color='#D8BFD8'),
        width=1000,
        height=600,
        margin=dict(l=80, r=80, t=100, b=80),
        hovermode='closest'
    )

    # Add range selector buttons for interactivity
    fig.update_layout(
        xaxis=dict(
            rangeselector=dict(
                buttons=list([
                    dict(count=7, label="7D", step="day", stepmode="backward"),
                    dict(count=15, label="15D", step="day", stepmode="backward"),
                    dict(count=30, label="30D", step="day", stepmode="backward"),
                    dict(step="all", label="All")
                ]),
                bgcolor='rgba(46, 49, 55, 0.8)',
                bordercolor='rgba(216, 191, 216, 0.5)',
                borderwidth=1,
                font=dict(color='#D8BFD8')
            ),
            rangeslider=dict(
                visible=True,
                bgcolor='rgba(46, 49, 55, 0.6)',
                bordercolor='rgba(216, 191, 216, 0.3)',
                borderwidth=1
            ),
            type="linear"
        )
    )

    # Add current and projected annotations
    fig.add_annotation(
        x=index_1[-1],
        y=float(data_final_inverse[-1]),
        text=f"<b>Current: ₹{float(data_final_inverse[-1]):,.2f}</b>",
        showarrow=True,
        arrowhead=2,
        arrowcolor='#9370DB',
        arrowwidth=2,
        bgcolor='#2E3137',
        bordercolor='#9370DB',
        borderwidth=1,
        font=dict(color='#D8BFD8', size=12)
    )

    fig.add_annotation(
        x=index_2[9],
        y=float(predictions_further[9]),
        text=f"<b>Projected: ₹{float(predictions_further[9]):,.2f}</b>",
        showarrow=True,
        arrowhead=2,
        arrowcolor='#c5f15c',
        arrowwidth=2,
        bgcolor='#2E3137',
        bordercolor='#c5f15c',
        borderwidth=1,
        font=dict(color='#D8BFD8', size=12)
    )

    fig.update_layout(
        xaxis=dict(
            type='date',
            title='Time Period (Days)'
        )
    )

    # Disable toolbar for cleaner embedding
    plot_json = fig.to_json()

    return {
    "graph": json.loads(plot_json),
    "monthEndBalance": month_end_predictions
    }
