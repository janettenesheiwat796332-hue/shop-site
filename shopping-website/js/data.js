/* Shared data + storage helpers (localStorage only) */
const LSG=(k,d)=>{try{const v=JSON.parse(localStorage.getItem(k));return v??d}catch(e){return d}};
const LSS=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const N=n=>'₦'+Math.round(n).toLocaleString('en-NG');
const WA='2348000000000'; // placeholder WhatsApp business number - change me
const CATS=['Fashion','Shoes','Bags','Electronics','Beauty','Watches & Jewelry','Home','Groceries'];
const STATUS=['Pending','Processing','Shipped','Out for delivery','Delivered','Cancelled'];
const SEED=[
['Ankara Print Shirt',0,18500,20,'👔',4.5,25],['Senator Native Wear',0,35000,15,'🧥',4.7,12],['Classic Leather Sneakers',1,42000,30,'👟',4.6,18],['Running Trainers',1,28500,10,'👞',4.2,40],
['Leather Tote Bag',2,39000,25,'👜',4.8,9],['Travel Backpack',2,24500,0,'🎒',4.3,30],['Wireless Earbuds',3,21000,35,'🎧',4.4,50],['Smartphone 128GB',3,235000,12,'📱',4.6,7],
['Vitamin C Serum',4,9800,20,'🧴',4.7,60],['Shea Butter Body Cream',4,6500,0,'🧼',4.5,80],['Gold-Tone Wristwatch',5,52000,28,'⌚',4.8,15],['Beaded Necklace',5,14500,10,'📿',4.1,22],
['Scented Candle Set',6,8500,0,'🕯️',4.4,45],['Cotton Bedsheet Set',6,23000,18,'🛏️',4.6,20],['Premium Rice 50kg',7,78000,5,'🍚',4.9,35],['Vegetable Oil 5L',7,16500,0,'🛢️',4.3,8]
].map((a,i)=>({id:i+1,name:a[0],cat:CATS[a[1]],price:a[2],disc:a[3],emoji:a[4],rating:a[5],stock:a[6],sold:(i*37)%90+10,desc:'Premium quality '+a[0].toLowerCase()+'. Carefully sourced, durable and made for everyday Nigerian life.'}));
const getProducts=()=>{let p=LSG('sw_products');if(!p){p=SEED;LSS('sw_products',p)}return p};
const fin=p=>p.price*(1-p.disc/100);
const getCoupons=()=>LSG('sw_coupons',{WELCOME10:10,FLASH20:20});
const getOrders=()=>{let o=LSG('sw_orders');if(!o){const mk=(r,n,e,t,s,d)=>({ref:r,date:Date.now()-d*864e5,items:[{name:'Demo item',qty:1,price:t}],sub:t,disc:0,ship:2500,total:t+2500,status:s,pay:'Bank transfer',cust:{name:n,email:e,city:'Aba',state:'Abia'}});
 o=[mk('SW1000101','Chioma Okafor','chioma@example.com',42000,'Delivered',6),mk('SW1000102','Tunde Bello','tunde@example.com',78000,'Shipped',2),mk('SW1000103','Amina Yusuf','amina@example.com',21000,'Pending',0)];LSS('sw_orders',o)}return o};
const hue=p=>CATS.indexOf(p.cat)*45;
const art=p=>`<div class="art" style="background:linear-gradient(135deg,hsl(${hue(p)},60%,93%),hsl(${hue(p)},50%,78%))"><span>${p.emoji}</span></div>`;
