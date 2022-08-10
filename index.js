class Good {
    constructor (id, name, description, sizes, price, available) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.sizes = sizes;
        this.price = price;
        this.available = available;
    }

    setAvailable(available) {
        this.available = available;
    }
}

class GoodsList {
    #goods;
    constructor (filter, sortPrice, sortDir) {
        this.#goods = [];
        this.filter = filter;
        this.sortPrice = sortPrice;
        this.sortDir = sortDir;
    }

    get list() {

        let regexp = new RegExp(`${this.filter}`, 'i');
        let goods = this.#goods.filter(product => regexp.test(product.name) && product.available);
        if (this.sortPrice === true) {
            if (this.sortDir === true) {
                goods.sort((a, b) => a.price > b.price ? 1 : -1);
            }
            else {
                goods.sort((a, b) => a.price > b.price ? -1 : 1);
            }
        }
        return goods;
    }

    add(good) {
        this.#goods.push(good);
    }

    rem(id) {
        for (let i = 0; i < this.#goods.length; i++) {
            if (this.#goods[i].id === id) {
                delete this.#goods[i];
            }
        }
    }
}    

class BasketGood extends Good {
    constructor(id, name, description, sizes, price, available, amount) {
        super(id, name, description, sizes, price, available, amount) 
        this.amount = amount;
    }
}

class Basket {
    constructor() {
        this.goods = [];
    }

    add (good, amount) {
        if (good.available === true || good.available === false) {
            if (this.goods.includes(good)) {
                this.goods.forEach(item => {
                    if (item.id === good.id) {
                        item.amount += amount;
                    }
                });
            } else {
                this.goods.push(good);
            }
        }
        return this.goods   
    }

    remove (good, amount) {
        if (this.goods.includes(good)) {
            this.goods.forEach(item => {
                if (item.id === good.id) {
                    item.amount -= amount;
                    if (item.amount === 0) {
                        delete this.goods[this.goods.indexOf(item)]
                    }
                }
            } )    
        } 
        return this.goods
    }
    
    clear () {
        this.goods.forEach(item => {
            delete this.goods[this.goods.indexOf(item)]
        });
        return this.goods
    }

    removeUnavailable() {
        let unavailableList = this.goods.filter(good => good.available === false)
        this.goods.forEach(item => {
            unavailableList.forEach(el => {
                if (item.id === el.id) {
                    delete this.goods[this.goods.indexOf(item)]
                }
            }) 
        });
        return this.goods
    }

    get totalSum() {         
        let priceList = this.goods.map(function(item) {
            return item.price * item.amount;
        });
        
        let allPrice = 0;
        priceList.forEach(function(item) {
            allPrice += item;
        });
        return allPrice
    }

    get totalAmount() {            
        let amountList = this.goods.map(function(item) {
            return item.amount;
        });

        let allAmount = 0;
        amountList.forEach(function(item) {
            allAmount += item;
        });
        return allAmount
    }
}

const goodsLoad = [
    {
        id: 1,
        name: 'Футболка',
        description: 'С Риком и морти',
        sizes: [44, 46, 48],
        price: 2200,
        available: true,
    },
    {
        id: 2,
        name: 'Куртка',
        description: 'Повседневная',
        sizes: [40, 42, 44],
        price: 5000,
        available: true,
    },
    {
        id: 3,
        name: 'Кроссовки',
        description: 'Джорданы',
        sizes: [41, 42, 43],
        price: 12000,
        available: false,
    },
    {
        id: 4,
        name: 'Куртка',
        description: 'Для сноубордиста',
        sizes: [48, 42, 50],
        price: 17000,
        available: true,
    },
    {
        id: 5,
        name: 'Кепка',
        description: 'Для игры в теннис',
        sizes: [38, 39, 48],
        price: 1800,
        available: false,
    },
]

const goodsList = new GoodsList('курт', true, true);
for (let i = 1;i < goodsLoad.length; i++) {
    const good = new Good(goodsLoad[i].id, goodsLoad[i].name, goodsLoad[i].description, goodsLoad[i].sizes, goodsLoad[i].price, goodsLoad[i].available)
    goodsList.add(good)
}

//Вывести отфильтрованный список
// console.log(goodsList.list)

//Поменять наличие
// goodsList.list[0].setAvailable(false)
// console.log(goodsList.list)

//Удалить из списка товаров
// goodsList.rem(2)
// console.log(goodsList.list)

const basket = new Basket();
const basketGood1 = new BasketGood(goodsList.list[0].id, goodsList.list[0].name, goodsList.list[0].description, goodsList.list[0].sizes, goodsList.list[0].price, goodsList.list[0].available, 10)
const basketGood2 = new BasketGood(goodsList.list[1].id, goodsList.list[1].name, goodsList.list[1].description, goodsList.list[1].sizes, goodsList.list[1].price, goodsList.list[1].available, 20)
const basketGood3 = new BasketGood(3, 'Куртка', 'Зимняя', ['44, 31, 38'], 5000, false, 3)



basket.add(basketGood1)
basket.add(basketGood2)
basket.add(basketGood2, 5)
basket.add(basketGood3)


basket.remove(basketGood2, 10)
// basket.clear()
// basket.removeUnavailable()


console.log(basket.totalAmount)
console.log(basket.totalSum)





