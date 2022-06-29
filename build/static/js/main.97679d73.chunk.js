(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{20:function(e,n,t){e.exports=t(52)},50:function(e,n,t){},52:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(18),u=t.n(o),c=t(19),l=t(2),i=function(e){return r.a.createElement("div",null,"filter by name:",r.a.createElement("input",{value:e.newFilter,onChange:e.handleFiltering}))},d=function(e){return r.a.createElement("form",{onSubmit:e.submit},r.a.createElement("p",null),r.a.createElement("div",null,"Name:",r.a.createElement("input",{value:e.newName,onChange:e.handleNameAdding})),r.a.createElement("p",null),r.a.createElement("div",null,"Number:",r.a.createElement("input",{value:e.newNumber,onChange:e.handleNumberAdding})),r.a.createElement("p",null),r.a.createElement("button",{type:"submit"},"add to phonebook"))},m=function(e){var n=e.personsToShow,t=e.handleDeleting;return r.a.createElement("div",null,n.map(function(e){return r.a.createElement("ul",{key:e.id},e.name," ",e.number,r.a.createElement("button",{onClick:function(){return t(e)}},"delete"))}))},f=t(4),s=t.n(f),b="/api/persons",h=function(){return s.a.get(b).then(function(e){return e.data})},p=function(e){return s.a.post(b,e).then(function(e){return e.data})},g=function(e,n){return s.a.put("".concat(b,"/").concat(e),n).then(function(e){return e.data})},E=function(e){return s.a.delete("".concat(b,"/").concat(e)).then(function(e){return e.data})},w=function(){var e=Object(a.useState)([{name:"Arto Hellas",id:"1",number:"0401231244"}]),n=Object(l.a)(e,2),t=n[0],o=n[1],u=Object(a.useState)(""),f=Object(l.a)(u,2),s=f[0],b=f[1],w=Object(a.useState)(""),v=Object(l.a)(w,2),j=v[0],O=v[1],y=Object(a.useState)(""),N=Object(l.a)(y,2),S=N[0],k=N[1],T=Object(a.useState)(null),C=Object(l.a)(T,2),x=C[0],A=C[1],P=Object(a.useState)(!1),D=Object(l.a)(P,2),F=D[0],B=D[1],J=""===S?t:t.filter(function(e){return e.name.toLowerCase().includes(S.toLowerCase())});return Object(a.useEffect)(function(){h().then(function(e){o(e)})},[]),r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(function(e){var n=e.message,t={color:e.redError?"red":"green",background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"5px",padding:"10px",marginBottom:"10px"};return null===n?null:r.a.createElement("div",{style:t},n)},{message:x,redError:F}),r.a.createElement(i,{value:S,handleFiltering:function(e){k(e.target.value)}}),r.a.createElement(d,{newName:s,handleNameAdding:function(e){b(e.target.value)},newNumber:j,handleNumberAdding:function(e){O(e.target.value)},submit:function(e){if(e.preventDefault(),t.some(function(e){return e.name===s})){if(!window.confirm("".concat(s," is already added to the phonebook, do you want to replace the old number with the new one?")))return b(""),void O("");var n=t.find(function(e){return e.name===s}),a=Object(c.a)({},n,{number:j});g(a.id,a).then(function(e){o(t.map(function(e){return e.name!==s?e:a})),B(!1),A("Number updated"),setTimeout(function(){A(null)},4e3)})}else p({name:s,number:j}).then(function(e){o(t.concat(e)),b(""),O(""),console.log(e),B(!1),A("Person added"),setTimeout(function(){A(null)},4e3)}).catch(function(e){B(!0),A("couldn't create a person: ".concat(e.reponse.data.error)),setTimeout(function(){A(null)},4e3)})}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(m,{personsToShow:J,handleDeleting:function(e){window.confirm("sure you want to delete ".concat(e.name,"?"))&&E(e.id).then(function(n){o(t.filter(function(n){return n.id!==e.id})),console.log("deleted ".concat(e.name)),B(!1),A("Person deleted"),setTimeout(function(){A(null)},4e3)}).catch(function(n){console.log("couldn't delete ".concat(e.name," maybe already deleted")),o(t.filter(function(n){return n.id!==e.id})),B(!0),A("Person already deleted"),setTimeout(function(){A(null)},4e3)})}}))};t(50);u.a.createRoot(document.getElementById("root")).render(r.a.createElement(w,null))}},[[20,2,1]]]);
//# sourceMappingURL=main.97679d73.chunk.js.map