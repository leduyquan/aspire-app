import api from "./api";
class CardService {
  getCardAll() {
    return api.get("/cards/");
  }

  createCard(data) {
    return api.post("/cards/", data);
  }

  updateCard(id, data) {
    return api.put(`/cards/${id}`, data);
  }

  deleteCard(id) {
    return api.delete(`/cards/${id}`);
  }
}

export default new CardService();