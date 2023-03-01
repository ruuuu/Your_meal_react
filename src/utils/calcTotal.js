export const calcTotalCount = (orderGoods) => {   // orderGoods = [ {id, title, weight, price, count}, {}, {} ]

      let count = orderGoods.reduce((acc, item) => {  // reduce() суумирует item.count у всех элементов массива, 0-нач значение acc
            return (acc + item.count);
      }, 0);

      return count;
};


export const calcTotalPrice = (orderGoods) => {   // orderGoods = [ {id, title, weight, price, count}, {}, {} ]

      let price = orderGoods.reduce((acc, item) => {
            return (acc + item.count * item.price);
      }, 0);

      return price;

};