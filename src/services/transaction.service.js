import api from "./api";
class TransactionService {
  getTransactionRecent() {
    return api.get("/transactions/");
  }
}

export default new TransactionService();