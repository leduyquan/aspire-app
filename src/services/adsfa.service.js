import api from "./api";
class ProductDataService {
  getAll() {
    return api.get("/products/es-search/*/");
  }

  get(id) {
    return api.get(`/products/id-es-search/${id}/`);
  }

  create(data) {
    return api.post("/products/api/", data);
  }

  update(id, data) {
    return api.put(`/products/api/${id}/`, data);
  }

  delete(id) {
    return api.delete(`/products/api/${id}/`);
  }

  findByTitle(title) {
    return api.get(`/products/es-search/${title}/`);
  }
}

export default new ProductDataService();