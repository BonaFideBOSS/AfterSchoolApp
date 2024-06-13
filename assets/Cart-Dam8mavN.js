import{_ as y,b as C,s as L,o as r,c as d,a as t,w as P,d as p,v as f,n as m,e as _,t as u,F as k,p as V,f as S,R as E,g as b,h as g,r as N,i as v,j as T}from"./index-DRJeTT8V.js";const M="/AfterSchoolApp/assets/bag-DWXmQS3S.png",$={props:["cartDetails","cartTotal"],data(){return{savedLessons:this.$root.savedLessons,cart:this.$root.cart,user:{name:"",phone:"",isNameValid:!1,isPhoneValid:!1},checkoutSuccessful:!1,orderErrorMessage:"Order Failed!"}},mounted(){var o=document.getElementById("checkoutPage");o&&(new mdb.Sidenav(o),o.addEventListener("show.mdb.sidenav",()=>{document.body.style.overflow="hidden"}),o.addEventListener("hide.mdb.sidenav",()=>{document.body.style.overflow="unset"}))},methods:{validateUserName(){this.user.isNameValid=/^[a-zA-Z]+$/.test(this.user.name)},validateUserPhone(){this.user.isPhoneValid=/^\d+$/.test(this.user.phone)},async submitOrder(o){const e=o.target.querySelector('[type="submit"]'),h=e.innerHTML;e.disabled=!0,e.innerHTML=C;try{if(!(this.user.isNameValid&&this.user.isPhoneValid))throw this.orderErrorMessage="Username or phone is invalid.",Error(this.orderErrorMessage);const i={username:this.user.name,phone:parseInt(this.user.phone),booked_lessons:this.cartDetails.map(n=>({_id:n._id,quantity:n.quantity,total:n.total})),total_price:this.cartTotal},s=`${this.$root.serverURL}order/new`,a=await L(s,i);if(a.orderSuccessful)this.checkoutSuccessful=!0,this.$router.push("/"),document.body.style.overflow="unset",this.$nextTick(()=>{this.cart.length=0,this.savedLessons.length=0});else throw this.orderErrorMessage=a.errorMessage,Error(this.orderErrorMessage)}catch(i){console.log(i)}finally{const i=document.getElementById("checkoutResult");new mdb.Modal(i).show(),i.addEventListener("hidden.mdb.modal",()=>{this.checkoutSuccessful=!1}),e.disabled=!1,e.innerHTML=h}}}},l=o=>(V("data-v-5b5e186f"),o=o(),S(),o),I=l(()=>t("div",{class:"text-end mt-4"},[t("button",{"data-mdb-ripple-init":"","data-mdb-toggle":"sidenav","data-mdb-target":"#checkoutPage",class:"btn btn-lg btn-warning btn-rounded col-12 col-md-5 col-lg-3"},[t("span",null,"Checkout"),t("i",{class:"fa-solid fa-arrow-right ms-2"})])],-1)),D={"data-mdb-sidenav-init":"",id:"checkoutPage",class:"sidenav py-4 w-100","data-mdb-mode":"push","data-mdb-right":"true","data-mdb-backdrop":"true","data-mdb-scroll-container":"#checkoutPageContent"},U=l(()=>t("div",{class:"container"},[t("button",{"data-mdb-ripple-init":"","data-mdb-toggle":"sidenav","data-mdb-target":"#checkoutPage",class:"btn btn-lg btn-secondary text-dark btn-floating"},[t("i",{class:"fa-solid fa-arrow-left"})])],-1)),R={id:"checkoutPageContent",class:"container text-center mb-4 pb-4"},q=l(()=>t("img",{class:"pageLogo mb-4",src:M,alt:"checkout"},null,-1)),O=l(()=>t("h1",{class:"fw-bolder mb-4 text-center"},"Checkout",-1)),A=l(()=>t("p",{class:"text-muted"},"Please fill the checkout form.",-1)),B={class:"mb-3"},F={class:"form-floating"},j=l(()=>t("label",{for:"username"},"Name",-1)),z={key:0,class:"small text-danger"},H={class:"mb-3"},Q={class:"form-floating"},W=l(()=>t("label",{for:"phone"},"Phone",-1)),X={key:0,class:"small text-danger"},Y=["disabled"],Z={class:"modal fade",id:"checkoutResult",tabindex:"-1","data-mdb-backdrop":"static","data-mdb-keyboard":"false"},G={class:"modal-dialog modal-dialog-centered"},J={class:"modal-content rounded-7"},K={class:"modal-body text-center"},tt={key:0},et=l(()=>t("i",{class:"fa-light fa-circle-check fa-5x text-success my-4"},null,-1)),st=l(()=>t("h5",{class:"mb-0"},"Order Submitted!",-1)),ot=[et,st],at={key:1},nt=l(()=>t("i",{class:"fa-light fa-circle-x fa-5x text-danger my-4"},null,-1)),rt=["textContent"],dt={class:"modal-footer border-0 mx-auto"},it=l(()=>t("button",{class:"btn btn-primary","data-mdb-dismiss":"modal","data-mdb-ripple-init":""}," Okay ",-1));function lt(o,e,h,i,s,a){return r(),d(k,null,[I,t("nav",D,[U,t("div",R,[q,O,A,t("form",{onSubmit:e[4]||(e[4]=P((...n)=>a.submitOrder&&a.submitOrder(...n),["prevent"])),class:"offset-md-3 col-md-6 offset-lg-4 col-lg-4"},[t("div",B,[t("div",F,[p(t("input",{"onUpdate:modelValue":e[0]||(e[0]=n=>s.user.name=n),onInput:e[1]||(e[1]=(...n)=>a.validateUserName&&a.validateUserName(...n)),type:"text",id:"username",class:m(["form-control",{"border-danger":!s.user.isNameValid&&s.user.name,"border-success":s.user.isNameValid&&s.user.name}]),placeholder:"username",autocomplete:"off"},null,34),[[f,s.user.name]]),j]),!s.user.isNameValid&&s.user.name?(r(),d("span",z," Name must only contain letters. ")):_("",!0)]),t("div",H,[t("div",Q,[p(t("input",{"onUpdate:modelValue":e[2]||(e[2]=n=>s.user.phone=n),onInput:e[3]||(e[3]=(...n)=>a.validateUserPhone&&a.validateUserPhone(...n)),type:"tel",id:"phone",class:m(["form-control",{"border-danger":!s.user.isPhoneValid&&s.user.phone,"border-success":s.user.isPhoneValid&&s.user.phone}]),placeholder:"phone",autocomplete:"off"},null,34),[[f,s.user.phone]]),W]),!s.user.isPhoneValid&&s.user.phone?(r(),d("span",X," Phone must only contain numbers. ")):_("",!0)]),t("button",{disabled:!(s.user.isNameValid&&s.user.isPhoneValid),type:"submit",class:m(["w-100 btn btn-lg",[s.user.isNameValid&&s.user.isPhoneValid?"btn-success":"btn-secondary"]]),"data-mdb-ripple-init":""}," Submit Order ",10,Y)],32)])]),t("div",Z,[t("div",G,[t("div",J,[t("div",K,[s.checkoutSuccessful?(r(),d("div",tt,ot)):(r(),d("div",at,[nt,t("h5",{class:"mb-0",textContent:u(s.orderErrorMessage)},null,8,rt)]))]),t("div",dt,[s.checkoutSuccessful?(r(),d("button",{key:0,onClick:e[5]||(e[5]=n=>o.$router.push("/myorders")),class:"btn btn-secondary","data-mdb-dismiss":"modal","data-mdb-ripple-init":""}," My order history ")):_("",!0),it])])])])],64)}const ct=y($,[["render",lt],["__scopeId","data-v-5b5e186f"]]),ut={components:{RouterLink:E,Checkout:ct},data(){return{savedLessons:this.$root.savedLessons,cart:this.$root.cart}},methods:{emptyCart(){this.cart.length=0,this.savedLessons.length=0},removeFromCart(o){const e=this.cart.lastIndexOf(o._id);e>-1&&this.cart.splice(e,1)},canRemoveFromCart(o){return this.cartItemCount(o._id)>0},cartItemCount(o){return this.cart.filter(e=>e===o).length}},computed:{cartDetails(){return Array.from(new Set(this.cart)).map(e=>{const h=this.savedLessons.find(s=>s._id===e),i=this.cartItemCount(e);return this.booked_lessons={},{...h,quantity:i,total:i*h.price}})},cartTotal(){return this.cartDetails.reduce((o,e)=>o+e.total,0)}}},ht={class:"container my-5"},mt=t("h1",{class:"fw-bolder mb-4 text-center"},"My Cart",-1),_t={key:0,class:"small d-flex flex-wrap text-nowrap justify-content-center justify-content-md-end mb-2"},bt=t("i",{class:"fa-solid fa-share fa-flip-horizontal me-2"},null,-1),pt=t("span",null,"Continue shopping",-1),ft=t("i",{class:"fa-solid fa-trash-can me-2"},null,-1),gt=t("span",null,"Empty cart",-1),vt=[ft,gt],yt={key:1},kt={class:"table-responsive"},xt={class:"table align-middle table-hover text-nowrap"},wt=t("thead",null,[t("tr",null,[t("th",null,"#"),t("th",{colspan:"2"},"Lesson"),t("th",{class:"text-end"},"Price"),t("th")])],-1),Ct={class:"fs-5"},Lt={class:"text-start w-100"},Pt={class:"mb-0"},Vt={class:"mb-0 small text-muted"},St={class:"text-end"},Et={class:"mb-0 small text-muted"},Nt={class:"mb-0"},Tt={class:"text-center"},Mt=["onClick"],$t=t("i",{class:"fa-solid fa-trash-can"},null,-1),It=[$t],Dt={class:"fs-5 text-end"},Ut=t("th",{colspan:"3"},"Total:",-1),Rt=t("th",null,null,-1),qt={key:2,class:"text-center"},Ot=t("p",{class:"fs-5"},"Your cart is empty.",-1);function At(o,e,h,i,s,a){const n=v("RouterLink"),x=v("Checkout");return r(),d("div",ht,[mt,s.cart.length>0?(r(),d("div",_t,[b(n,{to:"/",class:"btn btn-link","data-mdb-ripple-init":"","data-mdb-ripple-color":"dark"},{default:g(()=>[bt,pt]),_:1}),t("button",{onClick:e[0]||(e[0]=(...c)=>a.emptyCart&&a.emptyCart(...c)),class:"btn text-danger btn-link","data-mdb-ripple-init":"","data-mdb-ripple-color":"dark"},vt)])):_("",!0),s.cart.length>0?(r(),d("div",yt,[t("div",kt,[t("table",xt,[wt,t("tbody",Ct,[(r(!0),d(k,null,N(a.cartDetails,(c,w)=>(r(),d("tr",null,[t("td",null,u(w+1),1),t("td",null,[t("i",{class:m(["fa-duotone fa-2x fa-fw",`${c.icon} text-${c.color}`])},null,2)]),t("td",Lt,[t("p",Pt,u(c.subject),1),t("p",Vt,u(c.location),1)]),t("td",St,[t("p",Et,u(c.quantity)+"x"+u(c.price),1),t("p",Nt,"AED "+u(c.total),1)]),t("td",Tt,[t("button",{onClick:Bt=>a.removeFromCart(c),class:"btn btn-sm btn-outline-danger rounded-4","data-mdb-ripple-init":"","data-mdb-ripple-color":"dark"},It,8,Mt)])]))),256))]),t("tfoot",Dt,[t("tr",null,[Ut,t("th",null,"AED "+u(a.cartTotal),1),Rt])])])]),b(x,{cartDetails:a.cartDetails,cartTotal:a.cartTotal},null,8,["cartDetails","cartTotal"])])):(r(),d("div",qt,[Ot,b(n,{to:"/",class:"btn btn-lg btn-primary rounded-4","data-mdb-ripple-init":"","data-mdb-ripple-color":"dark"},{default:g(()=>[T(" Browse lessons ")]),_:1})]))])}const jt=y(ut,[["render",At]]);export{jt as default};
