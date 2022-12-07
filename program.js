class Product{ //Class made for products from inventory
    constructor(item, quantity, regular_price,member_price,tax_status)
    {
        this.item=item;
        this.quantity=quantity;
        this.regular_price=regular_price;
        this.member_price=member_price;
        this.tax_status=tax_status;    
    }
    AddInventory(products) //Adds items to inventory as objects.
    {
        try
        {
            var inventory=[];
            for(let i=0;i<products.length;i++)
            {
                inventory.push(new Product(products[i][0],products[i][1],products[i][2],products[i][3],products[i][4]));
            }
            return inventory;
        }
        catch(e)
        {
        alert(e.message);
        }      
    }
    SearchInInventory(product) //Searchs the product in the inventory so it can be updated.
    {
        try{
            for(let i=0;i<inventory.length;i++)
            {
                if(inventory[i].item==product.item) //If a product has the same name the program changes the quantity available.
                {
                    inventory[i].quantity= +inventory[i].quantity- +product.quantity;
                    
                }           
            }
            Choose_Member(typeofmember); //Chooses the inventory to show on screen once it's been updated.
        }
        catch(e)
        {
        alert(e.message);
        }   
    
}
    
}
class ProductCart{  //This class is for the cart products. It's also used for generating the transaction once the button is pressed.
    constructor(item, quantity, price,tax_status,total)
    {
    this.item=item;
    this.quantity=quantity;
    this.price=price;
    this.tax_status=tax_status;    
    this.total=total;
}
SearchInCart(product) //Searchs if the new product is already in cart, so its data can be updated.
{
    try
    {
        var condition=false;
    for(let i=0;i<cart.length;i++)
    {
        if(cart[i].item==product.item) //If the new product is already in cart, it only updates its values, so we don't see duplicates.
        {
            console.log(product.quantity);
            console.log(product.total);
            cart[i].quantity= +cart[i].quantity+ +product.quantity;
            cart[i].total= +cart[i].total+ +product.total;
            condition=true;
        }
        if(cart[i].quantity<=0) //If quantity is minor than 1 it's because we're deleting the whole product from cart. With this code instead of seeing 0 in quantity, the product dissapears from cart.
        {
            cart.splice(i,1);
        }      
    }
    return condition;
    }
    catch(e)
        {
        alert(e.message);
        }   
    
}
AddCart(nam,price,tax_status){ //Adds products in cart
    let quan=document.getElementById(nam).value
    if(quan>0)
    {
        console.log(nam +" " +quan + " "+price);
        var total= (quan*price).toFixed(2);
        var new_product=new ProductCart(nam,quan,price,tax_status,total);
        inventoryobject.SearchInInventory(new_product);
        if(!cartobject.SearchInCart(new_product))
        {
            cart.push(new_product);
        }    
        console.log(total)
        document.querySelector("#cart_table tbody").innerHTML = cart.map(cart => `<tr><td>${cart.item}</td><td>${cart.quantity}</td><td>${cart.price}</td><td>${cart.total}</td><td><input type="number" id=" ${cart.item}" name="articles"
        min="1" max="${cart.quantity}"> <p></p><button onclick="cartobject.DeleteCart('${cart.item}',${cart.price})" class="btn btn-primary"">Delete</button></td></tr>`).join('')
    
    }
    }
DeleteCart(nam,price){ //Deletes products in cart
    console.log(cart)
    let quan= -(document.getElementById(" "+nam).value)
    var total= (quan*price).toFixed(2);
    var new_product=new ProductCart(nam,quan,price,"",total);
    console.log(new_product)
    inventoryobject.SearchInInventory(new_product);
    if(!cartobject.SearchInCart(new_product))
    {
        cart.push(new_product);
    }    
    console.log(total)
    document.querySelector("#cart_table tbody").innerHTML = cart.map(cart => `<tr><td>${cart.item}</td><td>${cart.quantity}</td><td>${cart.price}</td><td>${cart.total}</td><td><input type="number" id=" ${cart.item}" name="articles"
    min="1" max="${cart.quantity}"> <p></p><button onclick="cartobject.DeleteCart('${cart.item}',${cart.price})" class="btn btn-primary"">Delete</button></td></tr>`).join('')
}
EmptyCart() //Deletes all products in cart. However, the transaction is still running with the same costumer.
{
    
    inventory= inventoryobject.AddInventory(products);
    cart=[];
    Choose_Member(typeofmember);
    document.querySelector("#cart_table tbody").innerHTML = cart.map(cart => `<tr><td>${cart.item}</td><td>${cart.quantity}</td><td>${cart.price}</td><td>${cart.total}</td><td><input type="number" id=" ${cart.item}" name="articles"
    min="1" max="${cart.quantity}"> <p></p><button onclick="cartobject.DeleteCart('${cart.item}',${cart.price})" class="btn btn-primary"">Delete</button></td></tr>`).join('')

}

}
class Total{ //Class for total values in the transaction.
    constructor()
    {
        this.totalitems=0;
        this.subtotal=0.00;
        this.tax=0.00;
        this.total=0.00;
        this.cash=0.00;
        this.change=0.00;
        this.saved=0.00;
    }
    Calculate_Subtotal(cart) //Calculates the subtotal.
    {
        var subtotal=0.00;
        for(let i=0;i<cart.length;i++)
        {
            subtotal+= +cart[i].total;
        }
        return subtotal;
    }
    Calculate_Tax(cart) //Calculates taxes with 6.5%.
    {
        var tax=0.00;
        for(let i=0;i<cart.length;i++)
        {
            if(cart[i].tax_status=='Taxable')
                tax+= +cart[i].total*0.065;
        }
        return tax;
    }
    Calculate_Total(){ //Calculates the addition of subtotal + taxes.
        return +this.subtotal+ +this.tax;
    }
    Calculate_Change(){ //Calculates change.
        return +this.cash- +this.total;
    }
    Calculate_Saved(inventory,cart) //Calculates saved only on reward members, since they're having a discount. Regular costumers won't see this.
    {
        console.log(inventory); //This calculates how much this transactions would've cost if the costumer was a regular one and compares it to the actual amount of the transaction.
        console.log(cart);
        var saved=0.00;
        for(let i=0;i<cart.length;i++)
        {
            for(let j=0;j<inventory.length;j++)
            {
                if(cart[i].item==inventory[j].item)
                {
                    
                    saved+= Number(inventory[j].regular_price)*Number(cart[i].quantity);
                }
            }
        }
        
        return +saved - +this.subtotal;
    }
}
var arrayData=new Array(); //Portion of code used to read the inventory.txt.
var txtFile= new XMLHttpRequest();
var fileRoute='inventory.txt';
txtFile.open("GET",fileRoute,false);
txtFile.send(null);
var txt =txtFile.responseText;
function TransformTxt(text) //Transforms the text into inventory txt into rows sepparated by commas. A CSV type string so it can be easier to transform each row into a Product object.
{
    if(typeof text!=='string')
    {
        throw TypeError('Not a string');
    }
    return text.slice()
    .split(/(?:\n|\r)+/)
    .map(l=>l.split(/(?:,|:)+/));
}

function Choose_Member(id){ //Chooses if the costumer is a Reward Member or a Regular Costumer, so when adding a new product we can get the right price.
    typeofmember=id;
    if(typeofmember==0)
    {
        document.querySelector('#regular').disabled = true;
        document.getElementById("costumer").innerHTML='Client is a Reward Member';
        document.querySelector("#myTable tbody").innerHTML = inventory.map(invent => `<tr><td>${invent.item}</td><td>${invent.quantity}</td><td>${invent.regular_price}</td><td>${invent.member_price}</td><td>${invent.tax_status}</td><td> <input type="number" id="${invent.item}" name="tentacles"
    min="0" max="${invent.quantity}"> <p></p><button onclick="cartobject.AddCart('${invent.item}',${invent.member_price},'${invent.tax_status}')" class="btn btn-primary"">Add to Cart</button></td></tr>`).join('')

    }
        
    else
    {
        document.querySelector('#reward').disabled = true;
        document.getElementById("costumer").innerHTML='Client is a Regular Costumer';
        document.querySelector("#myTable tbody").innerHTML = inventory.map(invent => `<tr><td>${invent.item}</td><td>${invent.quantity}</td><td>${invent.regular_price}</td><td>${invent.member_price}</td><td>${invent.tax_status}</td><td> <input type="number" id="${invent.item}" name="tentacles"
    min="0" max="${invent.quantity}"> <p></p><button onclick="cartobject.AddCart('${invent.item}',${invent.regular_price},'${invent.tax_status}')" class="btn btn-primary"">Add to Cart</button></td></tr>`).join('')

    }
        
    
    
}
function Spaces(num) //Used for the transaction txt file. To show the products and their values, columns are separated by 40 charaters including data.
{
 var sp="";
 for(let i=0;i<num;i++)
 sp+=" ";
 return sp;
}
function Checkout() //This function is used to calculate the transaction's totals, set the new inventory.txt and creates the transaction txt file.
{
    const d=new Date();
    var calc_total=new Total();
    calc_total.cash=document.getElementById("cash").value;
    calc_total.totalitems=cart.length;
    calc_total.subtotal=calc_total.Calculate_Subtotal(cart);
    calc_total.tax=calc_total.Calculate_Tax(cart).toFixed(2);
    calc_total.total=calc_total.Calculate_Total().toFixed(2);
    calc_total.change=calc_total.Calculate_Change().toFixed(2);
    calc_total.saved=calc_total.Calculate_Saved(inventory,cart).toFixed(2);
    if(calc_total.change<0) //If change is less than 0 it's because the costumer didn't have enough money to pay the transaction and it won't be completed. An alert will indicate that.
    {
        alert("Not enough money to pay");
    }
    else
    {//Adds items from cart to a string so it can be generated into a txt file. Also generates the new inventory.
        var newinventory="";
        var output="";
       
        for(let i=0;i<inventory.length;i++)
        {
            newinventory+= inventory[i].item+":"+inventory[i].quantity+","+inventory[i].regular_price+","+inventory[i].member_price+","+inventory[i].tax_status+"\n";
        }
        output+=d.getMonth()+1+"-"+d.getDate()+"-"+d.getFullYear()+"\n";
        output+="TRANSACTION: 000001 \n";
        output+="ITEM" +Spaces(36)+"QUANTITY"+Spaces(32)+"UNIT PRICE"+Spaces(30)+"TOTAL\n"
        for(let i=0;i<cart.length;i++)
        {
            output+= cart[i].item +Spaces(40-cart[i].item.length)+
            cart[i].quantity+Spaces(40-String(cart[i].quantity).length)+
            cart[i].price +Spaces(40-String(cart[i].price).length)+
            cart[i].total +"\n";
        }
        output+="*************************************\n";
        output+="TOTAL NUMBER OF ITEMS SOLD: "+calc_total.totalitems+"\n";
        output+="SUB-TOTAL: "+calc_total.subtotal+"\n";
        output+="TAX (6.5%): "+calc_total.tax+"\n";
        output+="TOTAL: "+calc_total.total+"\n";
        output+="CASH: "+calc_total.cash+"\n";
        output+="CHANGE: "+calc_total.change+"\n";
        output+="*************************************\n";
        if(typeofmember==0)
            output+="YOU SAVED: $"+calc_total.saved+"!\n";
    }
    SaveFile(newinventory,"inventory");
    SaveFile(output,"Transaction_000001_"+(d.getMonth()+1)+d.getDate()+d.getFullYear());
    var fs = require('fs');
    fs.writeFile("inventory.txt",newinventory);
fs.writeFile("./inventory.txt", newinventory);
    console.log(newinventory);
    console.log(output);
}
const SaveFile = (content, name) => { //Used to generate txt files.
    const a = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL("url");
}
try
{
    var inventoryobject= new Product(); //Initializes the inventory object.
    var typeofmember; //variable to see if a costumer is a Regular Costumer or a Reward Member.
    var products= TransformTxt(txt) // A string variable which has the inventory.
    var inventory= inventoryobject.AddInventory(products) //Adds products into the inventory converting them into objects.
    var cartobject=new ProductCart();  //Initializes the cart object.
    var cart=[]; //Actual cart containing its products.
}
catch(e)
{
alert(e.message);
}
