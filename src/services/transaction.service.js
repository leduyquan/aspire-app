class TransactionService {
  getTransactionRecent() {
    return {
      data: {
        "balance": 3000,
        "data": [
          {
            "id": 1,
            "name": "Hamleys",
            "type": "file-storage",
            "status": true,
            "createdDate": "2022-03-06T16:37:00.069Z",
            "balance": 150
          },
          {
            "id": 2,
            "name": "Hamleys",
            "type": "flights",
            "status": false,
            "createdDate": "2022-03-06T16:37:00.069Z",
            "balance": 120
          },
          {
            "id": 3,
            "name": "Hamleys",
            "type": "megaphone",
            "status": false,
            "createdDate": "2022-03-06T16:37:00.069Z",
            "balance": 120
          },
          {
            "id": 4,
            "name": "Hamleys",
            "type": "file-storage",
            "status": false,
            "createdDate": "2022-03-06T16:37:00.069Z",
            "balance": 120
          }
        ]
      }
    }
  }
}

export default new TransactionService();