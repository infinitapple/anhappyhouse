(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-abea5f3c"],{"0519":function(t,e,s){},"23a4":function(t,e,s){"use strict";var a=s("0519"),r=s.n(a);r.a},"65ef":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"container"},[s("transition",{attrs:{name:"slide",appear:""}},[t.loadsuccess?s("div",{staticClass:"row mb-3 mt-5"},[s("div",{staticClass:"mx-auto col-md-6"},[s("div",{staticClass:"card shadow-lg bg-white"},[s("div",{staticClass:"card-header bg-info"},[s("h2",{staticClass:"card-title text-center font-weight-bolder text-uppercase text-white-50"},[t._v("Sign up")])]),s("div",{staticClass:"card-body"},[s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"user_name"}},[t._v("아이디")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userId,expression:"userId"}],staticClass:"form-control",attrs:{type:"text",id:"user_id"},domProps:{value:t.userId},on:{input:function(e){e.target.composing||(t.userId=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"pwd"}},[t._v("비밀번호")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userPwd,expression:"userPwd"}],staticClass:"form-control",attrs:{type:"password",id:"user_pwd"},domProps:{value:t.userPwd},on:{input:function(e){e.target.composing||(t.userPwd=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"user_name"}},[t._v("이름")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],staticClass:"form-control",attrs:{type:"text",id:"user_name"},domProps:{value:t.userName},on:{input:function(e){e.target.composing||(t.userName=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"email"}},[t._v("이메일")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"form-control",attrs:{type:"text",id:"email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"address"}},[t._v("주소")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.address,expression:"address"}],staticClass:"form-control",attrs:{type:"text",id:"address"},domProps:{value:t.address},on:{input:function(e){e.target.composing||(t.address=e.target.value)}}})]),s("div",{staticClass:"text-right"},[s("button",{staticClass:"btn btn-primary mr-3",on:{click:t.checkform}},[t._v("회원가입")]),s("router-link",{staticClass:"btn btn-primary",attrs:{to:"/",tag:"button"}},[t._v("돌아가기")])],1)])])])]):t._e()])],1)},r=[],i=s("5530"),o=s("2f62"),n={name:"signup",data:function(){return{loadsuccess:!1,userId:"",userPwd:"",userName:"",userType:0,email:"",address:""}},created:function(){this.loadsuccess=!0},methods:Object(i["a"])(Object(i["a"])({},Object(o["b"])(["action_signup"])),{},{checkform:function(){this.signup()},signup:function(){var t=this;this.action_signup(this.$data).then((function(e){e?(alert("회원가입되었습니다. 로그인해주세요."),t.movePage()):alert("회원가입에 실패했습니다.")}))},movePage:function(){this.$router.push("/")}})},u=n,d=(s("23a4"),s("2877")),l=Object(d["a"])(u,a,r,!1,null,"2299edae",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-abea5f3c.6eb84c87.js.map