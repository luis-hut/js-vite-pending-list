(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const m of n.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&l(m)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function L(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}let w;const C=new Uint8Array(16);function S(){if(!w){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");w=crypto.getRandomValues.bind(crypto)}return w(C)}const E=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),v={randomUUID:E};function P(e,t,a){e=e||{};const l=e.random??e.rng?.()??S();if(l.length<16)throw new Error("Random bytes length must be >= 16");return l[6]=l[6]&15|64,l[8]=l[8]&63|128,L(l)}function A(e,t,a){return v.randomUUID&&!e?v.randomUUID():P(e)}class p{constructor(t){this.id=A(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},r={todos:[new p("Piedra del alma"),new p("Piedra del infinito"),new p("Piedra del tiempo"),new p("Piedra del poder"),new p("Piedra del realidad")],filter:c.All},I=()=>{k(),console.log("InitStore")},k=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filters:t=c.All}=JSON.parse(localStorage.getItem("state"));r.todos=e,r.filter=t},f=()=>{localStorage.setItem("state",JSON.stringify(r))},q=(e=c.All)=>{switch(e){case c.All:return[...r.todos];case c.Completed:return r.todos.filter(t=>t.done);case c.Pending:return r.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},D=e=>{if(!e)throw new Error("Description is requiered");r.todos.push(new p(e)),f()},U=e=>{r.todos=r.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),f()},x=e=>{r.todos=r.todos.filter(t=>t.id!==e),f()},O=()=>{r.todos=r.todos.filter(e=>!e.done),f()},F=(e=c.All)=>{r.filter=e,f()},M=()=>r.filter,i={addTodo:D,deleteCompleted:O,deleteTodo:x,getCurrentFilter:M,getTodos:q,initStore:I,setFilter:F,toggleTodo:U},N=`<section class="todoapp">
    <header class="header">
        <h1>Tareas</h1>
        <input id="new-todo-input" class="new-todo" placeholder="¿Qué necesita ser hecho?" autofocus>
    </header>
    
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox">
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
            <!-- These are here just to show the structure of the list items -->
            <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
            <!-- <li class="completed" data-id="abc">
                <div class="view">
                    <input class="toggle" type="checkbox" checked>
                    <label>Probar JavaScript</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Create a TodoMVC template">
            </li> -->
            <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
        </ul>
    </section>

    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer">
        <!-- This should be "0 items left" by default -->
        <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
            <li>
                <a class="selected filtro" class="selected" href="#/">Todos</a>
            </li>
            <li>
                <a class="filtro" href="#/active">Pendientes</a>
            </li>
            <li>
                <a class="filtro" href="#/completed">Completados</a>
            </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Borrar completados</button>
    </footer>
</section>


<footer class="info">
    <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    <!-- Change this out with your name and url ↓ -->
    <p>Creado por <a href="http://todomvc.com">ti</a></p>
    <p>Parte de <a href="http://todomvc.com">TodoMVC</a></p>
</footer>`,H=e=>{if(!e)throw new Error("A TODO object is requiered");const{done:t,description:a,id:l}=e,o=`
        <div class="view">
            <input class="toggle" type="checkbox" ${t?"checked":""}>
            <label>${a}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",l),t&&n.classList.add("completed"),n};let y;const R=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=i.getTodos(c.Pending).length};let g;const V=(e,t=[])=>{if(g||(g=document.querySelector(e)),!g)throw new Error(`Element ${e} nor found`);g.innerHTML="",t.forEach(a=>{g.append(H(a))})},u={ClearCompleted:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},$=e=>{const t=()=>{const d=i.getTodos(i.getCurrentFilter());V(u.TodoList,d),a()},a=()=>{R(u.PendingCountLabel)};(()=>{const d=document.createElement("div");d.innerHTML=N,document.querySelector(e).append(d),t()})();const l=document.querySelector(u.NewTodoInput),o=document.querySelector(u.TodoList),n=document.querySelector(u.TodoList),m=document.querySelector(u.ClearCompleted),T=document.querySelectorAll(u.TodoFilters);l.addEventListener("keyup",()=>{event.keyCode===13&&event.target.value.trim().lenght!==0&&(i.addTodo(event.target.value),t(),event.target.value="")}),o.addEventListener("click",d=>{const h=d.target.closest("[data-id]");i.toggleTodo(h.getAttribute("data-id")),t()}),n.addEventListener("click",d=>{if(d.target.className==="destroy"){const b=d.target.closest("[data-id]");i.deleteTodo(b.getAttribute("data-id")),t()}}),m.addEventListener("click",()=>{const d=document.querySelectorAll(".completed");i.deleteCompleted(d),t()}),T.forEach(d=>{d.addEventListener("click",h=>{switch(T.forEach(b=>b.classList.remove("selected")),h.target.classList.add("selected"),h.target.text){case"Todos":i.setFilter(c.All);break;case"Pendientes":i.setFilter(c.Pending);break;case"Completados":i.setFilter(c.Completed);break}t()})})};i.initStore();$("#app");
