package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Item struct {
	Name           string `json:"name"`
	ExpirationDate string `json:"expirationDate"`
}

var items []Item

func main() {
	http.HandleFunc("/items", getItems)
	http.HandleFunc("/add", addItem)
	http.ListenAndServe(":8080", nil)
	log.Println("Server started on port 8080")

}

func getItems(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(items)
}

func addItem(w http.ResponseWriter, r *http.Request) {
	var newItem Item
	json.NewDecoder(r.Body).Decode(&newItem)
	items = append(items, newItem)
	json.NewEncoder(w).Encode(newItem)
}
