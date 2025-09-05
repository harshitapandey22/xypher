import axios from 'axios';
const FRAUD_DETECTION_API_URL = import.meta.env.VITE_FRAUD_DETECTION_API_URL;

export const detectFraud = (transactions, token) => {
    if (!FRAUD_DETECTION_API_URL) {
        return Promise.resolve({ data: { is_fraudulent: 0 } });
    }
    return axios.post(
        `${FRAUD_DETECTION_API_URL}/detect_fraud`,
        { transactions },
        { headers: { Authorization: `Bearer ${token}` } }
    );
};