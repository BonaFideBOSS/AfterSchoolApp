import{_ as y,R as k,s as x,c as r,a as e,b,w as _,d as h,F as p,r as w,t as l,e as C,f,v,n as m,g as V,o as i,h as P}from"./index-BXghrGrA.js";const L={components:{RouterLink:k},data(){return{savedLessons:this.$root.savedLessons,cart:this.$root.cart,user:{name:"",phone:"",isNameValid:!1,isPhoneValid:!1,ipAddress:""},checkoutSuccessful:!1,orderErrorMessage:"Order Failed!"}},mounted(){var n=document.getElementById("checkoutPage");n&&(new mdb.Sidenav(n),n.addEventListener("show.mdb.sidenav",()=>{document.body.style.overflow="hidden"}),n.addEventListener("hide.mdb.sidenav",()=>{document.body.style.overflow="unset"}))},methods:{emptyCart(){this.cart.length=0,this.savedLessons.length=0},removeFromCart(n){const t=this.cart.lastIndexOf(n._id);t>-1&&this.cart.splice(t,1)},canRemoveFromCart(n){return this.cartItemCount(n._id)>0},cartItemCount(n){return this.cart.filter(t=>t===n).length},validateUserName(){this.user.isNameValid=/^[a-zA-Z]+$/.test(this.user.name)},validateUserPhone(){this.user.isPhoneValid=/^\d+$/.test(this.user.phone)},async submitOrder(n){const t=n.target.querySelector('[type="submit"]'),u=t.innerHTML;t.disabled=!0,t.innerHTML=`<div class="d-flex gap-2 justify-content-center align-items-center">
                        <span class="spinner-border spinner-border-sm"></span> Please wait...
                      </div>`;try{if(!(this.user.isNameValid&&this.user.isPhoneValid))throw this.orderErrorMessage="Username or phone is invalid.",Error(this.orderErrorMessage);const d={username:this.user.name,phone:parseInt(this.user.phone),booked_lessons:this.cartDetails.map(c=>({_id:c._id,quantity:c.quantity,total:c.total})),total_price:this.cartTotal},s=`${this.$root.serverURL}order/new`,a=await x(s,d);if(a.orderSuccessful)this.checkoutSuccessful=!0,this.cart.length=0,this.savedLessons.length=0,this.$router.push("/"),document.body.style.overflow="unset";else throw this.orderErrorMessage=a.errorMessage,Error(this.orderErrorMessage)}catch(d){console.log(d)}finally{const d=document.getElementById("checkoutResult");new mdb.Modal(d).show(),d.addEventListener("hidden.mdb.modal",()=>{this.checkoutSuccessful=!1}),t.disabled=!1,t.innerHTML=u}}},computed:{cartDetails(){return Array.from(new Set(this.cart)).map(t=>{const u=this.savedLessons.find(s=>s._id===t),d=this.cartItemCount(t);return{...u,quantity:d,total:d*u.price}})},cartTotal(){return this.cartDetails.reduce((n,t)=>n+t.total,0)}}},E={class:"container my-5"},N=e("h1",{class:"fw-bolder mb-4 text-center"},"My Cart",-1),M={key:0,class:"small d-flex flex-wrap text-nowrap justify-content-end mb-2"},S=e("i",{class:"fa-solid fa-share fa-flip-horizontal me-2"},null,-1),T=e("span",null,"Continue shopping",-1),U=e("i",{class:"fa-solid fa-trash-can me-2"},null,-1),I=e("span",null,"Empty cart",-1),R=[U,I],q={key:1},D={class:"table-responsive"},O={class:"table align-middle table-hover text-nowrap"},B=e("thead",null,[e("tr",null,[e("th",null,"#"),e("th",{colspan:"2"},"Lesson"),e("th",{class:"text-end"},"Price"),e("th")])],-1),F={class:"fs-5"},A={class:"text-start w-100"},j={class:"mb-0"},z={class:"mb-0 small text-muted"},H={class:"text-end"},Y={class:"mb-0 small text-muted"},Z={class:"mb-0"},G={class:"text-center"},J=["onClick"],K=e("i",{class:"fa-solid fa-trash-can"},null,-1),Q=[K],W={class:"fs-5 text-end"},X=e("th",{colspan:"3"},"Total:",-1),$=e("th",null,null,-1),ee=e("div",{class:"text-end mt-4"},[e("button",{"data-mdb-ripple-init":"","data-mdb-toggle":"sidenav","data-mdb-target":"#checkoutPage",class:"btn btn-lg btn-warning btn-rounded col-12 col-md-5 col-lg-3"},[e("span",null,"Checkout"),e("i",{class:"fa-solid fa-arrow-right ms-2"})])],-1),te={"data-mdb-sidenav-init":"",id:"checkoutPage",class:"sidenav py-4 w-100","data-mdb-mode":"push","data-mdb-right":"true","data-mdb-backdrop":"true"},se=e("div",{class:"container mb-4"},[e("button",{"data-mdb-ripple-init":"","data-mdb-toggle":"sidenav","data-mdb-target":"#checkoutPage",class:"btn btn-lg btn-link text-dark btn-floating"},[e("i",{class:"fa-solid fa-arrow-left"})]),e("h1",{class:"fw-bolder mb-0 text-center"},"Checkout")],-1),oe={class:"container text-center"},ne=e("p",{class:"text-muted"},"Please fill the checkout form.",-1),ae={class:"mb-3"},re={class:"form-floating"},ie=e("label",{for:"username"},"Name",-1),de={key:0,class:"small text-danger"},le={class:"mb-3"},ce={class:"form-floating"},ue=e("label",{for:"phone"},"Phone",-1),he={key:0,class:"small text-danger"},me=["disabled"],be={key:2,class:"text-center"},_e=e("p",{class:"fs-5"},"Your cart is empty.",-1),pe={class:"modal fade",id:"checkoutResult",tabindex:"-1","data-mdb-backdrop":"static","data-mdb-keyboard":"false"},fe={class:"modal-dialog modal-dialog-centered"},ve={class:"modal-content rounded-7"},ge={class:"modal-body text-center"},ye={key:0},ke=e("i",{class:"fa-light fa-circle-check fa-5x text-success my-4"},null,-1),xe=e("h5",{class:"mb-0"},"Order Submitted!",-1),we=[ke,xe],Ce={key:1},Ve=e("i",{class:"fa-light fa-circle-x fa-5x text-danger my-4"},null,-1),Pe=["textContent"],Le={class:"modal-footer border-0 mx-auto"},Ee=e("button",{class:"btn btn-primary","data-mdb-dismiss":"modal","data-mdb-ripple-init":""}," Okay ",-1);function Ne(n,t,u,d,s,a){const c=V("RouterLink");return i(),r(p,null,[e("div",E,[N,s.cart.length>0?(i(),r("div",M,[b(c,{to:"/",class:"btn btn-link","data-mdb-ripple-init":"","data-mdb-ripple-color":"dark"},{default:_(()=>[S,T]),_:1}),e("button",{onClick:t[0]||(t[0]=(...o)=>a.emptyCart&&a.emptyCart(...o)),class:"btn text-danger btn-link","data-mdb-ripple-init":"","data-mdb-ripple-color":"dark"},R)])):h("",!0),s.cart.length>0?(i(),r("div",q,[e("div",D,[e("table",O,[B,e("tbody",F,[(i(!0),r(p,null,w(a.cartDetails,(o,g)=>(i(),r("tr",null,[e("td",null,l(g+1),1),e("td",null,[e("i",{class:m(["fa-duotone fa-2x fa-fw",`${o.icon} text-${o.color}`])},null,2)]),e("td",A,[e("p",j,l(o.subject),1),e("p",z,l(o.location),1)]),e("td",H,[e("p",Y,l(o.quantity)+"x"+l(o.price),1),e("p",Z,"AED "+l(o.total),1)]),e("td",G,[e("button",{onClick:Me=>a.removeFromCart(o),class:"btn btn-sm btn-outline-danger rounded-4","data-mdb-ripple-init":"","data-mdb-ripple-color":"dark"},Q,8,J)])]))),256))]),e("tfoot",W,[e("tr",null,[X,e("th",null,"AED "+l(a.cartTotal),1),$])])])]),ee,e("nav",te,[se,e("div",oe,[ne,e("form",{onSubmit:t[5]||(t[5]=C((...o)=>a.submitOrder&&a.submitOrder(...o),["prevent"])),class:"offset-md-3 col-md-6 offset-lg-4 col-lg-4"},[e("div",ae,[e("div",re,[f(e("input",{"onUpdate:modelValue":t[1]||(t[1]=o=>s.user.name=o),onInput:t[2]||(t[2]=(...o)=>a.validateUserName&&a.validateUserName(...o)),type:"text",id:"username",class:m(["form-control",{"border-danger":!s.user.isNameValid&&s.user.name,"border-success":s.user.isNameValid&&s.user.name}]),placeholder:"username",autocomplete:"off"},null,34),[[v,s.user.name]]),ie]),!s.user.isNameValid&&s.user.name?(i(),r("span",de," Name must only contain letters. ")):h("",!0)]),e("div",le,[e("div",ce,[f(e("input",{"onUpdate:modelValue":t[3]||(t[3]=o=>s.user.phone=o),onInput:t[4]||(t[4]=(...o)=>a.validateUserPhone&&a.validateUserPhone(...o)),type:"tel",id:"phone",class:m(["form-control",{"border-danger":!s.user.isPhoneValid&&s.user.phone,"border-success":s.user.isPhoneValid&&s.user.phone}]),placeholder:"phone",autocomplete:"off"},null,34),[[v,s.user.phone]]),ue]),!s.user.isPhoneValid&&s.user.phone?(i(),r("span",he," Phone must only contain numbers. ")):h("",!0)]),e("button",{disabled:!(s.user.isNameValid&&s.user.isPhoneValid),type:"submit",class:m(["w-100 btn btn-lg",[s.user.isNameValid&&s.user.isPhoneValid?"btn-success":"btn-secondary"]]),"data-mdb-ripple-init":""}," Checkout ",10,me)],32)])])])):(i(),r("div",be,[_e,b(c,{to:"/",class:"btn btn-lg btn-primary rounded-4","data-mdb-ripple-init":"","data-mdb-ripple-color":"dark"},{default:_(()=>[P(" Browse lessons ")]),_:1})]))]),e("div",pe,[e("div",fe,[e("div",ve,[e("div",ge,[s.checkoutSuccessful?(i(),r("div",ye,we)):(i(),r("div",Ce,[Ve,e("h5",{class:"mb-0",textContent:l(s.orderErrorMessage)},null,8,Pe)]))]),e("div",Le,[s.checkoutSuccessful?(i(),r("button",{key:0,onClick:t[6]||(t[6]=o=>n.$router.push("/myorders")),class:"btn btn-secondary","data-mdb-dismiss":"modal","data-mdb-ripple-init":""}," My order history ")):h("",!0),Ee])])])])],64)}const Te=y(L,[["render",Ne]]);export{Te as default};
