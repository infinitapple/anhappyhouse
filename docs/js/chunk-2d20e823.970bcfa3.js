(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d20e823"],{b054:function(s,t,e){"use strict";e.r(t);var r=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"container mt-5"},[e("div",{staticClass:"form-group row"},[e("label",{attrs:{for:"user_id"}},[s._v("아이디")]),e("input",{staticClass:"form-control",attrs:{type:"text",readonly:"",id:"user_id"},domProps:{value:s.userinfo.userId}})]),e("div",{staticClass:"form-group row"},[e("label",{attrs:{for:"user_name"}},[s._v("이름")]),e("input",{staticClass:"form-control",attrs:{type:"text",readonly:"",id:"user_name"},domProps:{value:s.userinfo.userName}})]),e("div",{staticClass:"form-group row"},[e("label",{attrs:{for:"email"}},[s._v("메일")]),e("input",{staticClass:"form-control",attrs:{type:"email",readonly:"",id:"email"},domProps:{value:s.userinfo.email}})]),e("div",{staticClass:"form-group row"},[e("label",{attrs:{for:"address"}},[s._v("주소")]),e("input",{staticClass:"form-control",attrs:{type:"text",readonly:"",id:"address"},domProps:{value:s.userinfo.address}})])])},a=[],o=e("5530"),i=e("2f62"),u={name:"userinfo",data:function(){return{loadsuccess:!1,userinfotmp:{userId:"",userPwd:"",userName:"",userType:0,email:"",address:""}}},computed:Object(o["a"])({},Object(i["c"])(["userinfo"])),created:function(){var s=this;this.$store.dispatch("action_getuserinfo").then((function(t){t?(s.userinfotmp=s.userinfo,s.loadsuccess=!0):(alert("사용자 정보 로딩에 실패했습니다."),s.$router.push("/"))}))}},n=u,l=e("2877"),d=Object(l["a"])(n,r,a,!1,null,null,null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d20e823.970bcfa3.js.map