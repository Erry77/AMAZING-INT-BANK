const axios = require("axios");

class NIBSSApiAdapter {
  constructor() {
    this.baseURL = process.env.NIBSS_BASE_URL || "https://nibssbyphoenix.onrender.com";

    this.apiKey = process.env.NIBSS_API_KEY;
    this.apiSecret = process.env.NIBSS_API_SECRET;

    this.token = null;
  }

  // ===============================
  // 🔐 AUTH - Get JWT Token
  // ===============================
  async authenticate() {
    try {
      const response = await axios.post(`${this.baseURL}/api/auth/token`, {
        apiKey: this.apiKey,
        apiSecret: this.apiSecret,
      });

      this.token = response.data.token;

      return this.token;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Authentication failed"
      );
    }
  }

  // ===============================
  // 🔑 Headers helper
  // ===============================
  getAuthHeader() {
    if (!this.token) {
      throw new Error("No token found. Call authenticate() first.");
    }

    return {
      Authorization: `Bearer ${this.token}`,
      "Content-Type": "application/json",
    };
  }

  // ===============================
  // 🏦 Fintech Onboarding
  // ===============================
  async onboardFintech(data) {
    try {
      const res = await axios.post(
        `${this.baseURL}/api/fintech/onboard`,
        data
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }

  // ===============================
  // 🧾 Create Account
  // ===============================
  async createAccount(data) {
    try {
      const res = await axios.post(
        `${this.baseURL}/api/account/create`,
        data,
        { headers: this.getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }

  // ===============================
  // 🔍 Name Enquiry
  // ===============================
  async nameEnquiry(accountNumber) {
    try {
      const res = await axios.get(
        `${this.baseURL}/api/account/nameenquiry/${accountNumber}`,
        { headers: this.getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }

  // ===============================
  // 💰 Balance
  // ===============================
  async getBalance(accountNumber) {
    try {
      const res = await axios.get(
        `${this.baseURL}/api/account/balance/${accountNumber}`,
        { headers: this.getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }

  // ===============================
  // 💸 Transfer
  // ===============================
  async transfer(data) {
    try {
      const res = await axios.post(
        `${this.baseURL}/api/transfer`,
        data,
        { headers: this.getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }

  // ===============================
  // 📊 Transaction Status (TSQ)
  // ===============================
  async getTransactionStatus(transactionId) {
    try {
      const res = await axios.get(
        `${this.baseURL}/api/transaction/${transactionId}`,
        { headers: this.getAuthHeader() }
      );
      return res.data;
    } catch (err) {
      throw err.response?.data || err.message;
    }
  }

  // ===============================
  // 🪪 BVN / NIN
  // ===============================
  async insertBVN(data) {
    const res = await axios.post(`${this.baseURL}/api/insertBvn`, data);
    return res.data;
  }

  async insertNIN(data) {
    const res = await axios.post(`${this.baseURL}/api/insertNin`, data);
    return res.data;
  }

  async validateBVN(data) {
    const res = await axios.post(`${this.baseURL}/api/validateBvn`, data);
    return res.data;
  }

  async validateNIN(data) {
    const res = await axios.post(`${this.baseURL}/api/validateNin`, data);
    return res.data;
  }
}

module.exports = new NIBSSApiAdapter();