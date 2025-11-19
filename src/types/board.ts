
// 🧩 A single task or item
export interface Card {
    id : string,
    title :string,
    description ?: string,
    createdAt : string,
    dueDate ?: string,
    completed : boolean
}
// 🧱 A list contains multiple cards 
export interface List {
    id : string,
    title : string,
    cardIds : string[], //this will have multiple card Ids
}

// 📋 A board contains multiple lists
export interface Board {
    id : string,
    name : string,
    listIds : string[],  //this will have multiple list ids
    createdAt : string
}



/*
Board
 ├── List 1
 │     ├── Card 1
 │     ├── Card 2
 │
 ├── List 2
       ├── Card 3
*/