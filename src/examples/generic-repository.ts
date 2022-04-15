interface Entity {
    id: number;
}

interface User extends Entity {
    name: string;
    lastName: string;
    age: number;
}

interface Book extends Entity {
    title: string;
    price: number;
}

// Generic repository pattern
interface Repository<E extends Entity> {
    getItem: (key: string) => E | undefined;
    addItem: (key: string, item: E) => E;
    // Burada repository pattern ile ilgili diğer method tanımları olabilir.
    // updateItem: (item: E) => E;
    // removeItem: (item: E) => E;
}

// Generic local storage repository
class LSRepository<E extends Entity> implements Repository<E> {
    getItem(key: string) {
        let item: E | undefined;
        const storedItem = localStorage.getItem(key);

        try {
            item = JSON.parse(storedItem as string) as E;
        }
        catch(error) {
            console.error(error);
        }

        return item;
    }

    addItem(key: string, item: E) {
        try {
            localStorage.setItem(key, JSON.stringify(item));
        }
        catch (error) {
            console.error(error);
        }

        return item;
    }
}

const lsUserRepository = new LSRepository<User>();
lsUserRepository.addItem("user1", {
    id: 1,
    name: "Aydın",
    lastName: "Akan",
    age: 34
});

const user1 = lsUserRepository.getItem("user1");
console.log(user1);

const lsBookRepository = new LSRepository<Book>();
lsBookRepository.addItem("book1", {
    id: 1,
    title: "The Lord of the Rings: Two Towers",
    price: 128.99
});

const book1 = lsBookRepository.getItem("book1");
console.log(book1);

// Generic cookie storage repository
// class CookieRepository<E extends Entity> implements Repository<E> {
//     getItem(key: string) {
//      Cookie'den item çek
//     }

//     addItem(key: string, item: E) {
//      Cookie'ye item ekle
//     }
// }

// const cookieUserRepository = new CookieRepository<User>();
// cookieUserRepository.addItem("user2", {
//     id: 2,
//     name: "Mehmet Can",
//     lastName: "Kocas",
//     age: 23
// });

// const user2 = cookieUserRepository.getItem("user2");
// console.log(user2);

// const cookieBookRepository = new CookieRepository<Book>();
// cookieBookRepository.addItem("book2", {
//     id: 2,
//     title: "The Lord of the Rings: Return of the King",
//     price: 234.99
// });

// const book2 = cookieBookRepository.getItem("book2");
// console.log(book2);
