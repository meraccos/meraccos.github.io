var s1 = document.getElementById("s1");
var s2 = document.getElementById("s2");
var s3 = document.getElementById("s3");
var s4 = document.getElementById("s4");
var s5 = document.getElementById("s5");
var s6 = document.getElementById("s6");
var s7 = document.getElementById("s7");
var s8 = document.getElementById("s8");
var s9 = document.getElementById("s9");
var s10 = document.getElementById("s10");
var s11 = document.getElementById("s11");
var s12 = document.getElementById("s12");
var s13 = document.getElementById("s13");
var s14 = document.getElementById("s14");
var s15 = document.getElementById("s15");
var s16 = document.getElementById("s16");
var s17 = document.getElementById("s17");
var s18 = document.getElementById("s18");

var v1 = document.getElementById("v1");
var v2 = document.getElementById("v2");
var v3 = document.getElementById("v3");
var v4 = document.getElementById("v4");
var v5 = document.getElementById("v5");
var v6 = document.getElementById("v6");
var v7 = document.getElementById("v7");
var v8 = document.getElementById("v8");
var v9 = document.getElementById("v9");
var v10 = document.getElementById("v10");
var v11 = document.getElementById("v11");
var v12 = document.getElementById("v12");
var v13 = document.getElementById("v13");
var v14 = document.getElementById("v14");
var v15 = document.getElementById("v15");
var v16 = document.getElementById("v16");
var v17 = document.getElementById("v17");
var v18 = document.getElementById("v18");

v1.innerHTML = s1.value / 100;
v2.innerHTML = s2.value / 100;
v3.innerHTML = s3.value / 100;
v4.innerHTML = s4.value / 100;
v5.innerHTML = s5.value / 100;
v6.innerHTML = s6.value / 100;
v7.innerHTML = s7.value / 100;
v8.innerHTML = s8.value / 100;
v9.innerHTML = s9.value / 100;
v10.innerHTML = s10.value / 100;
v11.innerHTML = s11.value / 100;
v12.innerHTML = s12.value / 100;
v13.innerHTML = s13.value / 100;
v14.innerHTML = s14.value / 100;
v15.innerHTML = s15.value / 100;
v16.innerHTML = s16.value / 100;
v17.innerHTML = s17.value / 100;
v18.innerHTML = s18.value / 100;


s1.oninput = function() {
    v1.innerHTML = (this.value / 100).toFixed(2);
}
s2.oninput = function() {
    v2.innerHTML = (this.value / 100).toFixed(2);
}
s3.oninput = function() {
    v3.innerHTML = (this.value / 100).toFixed(2);
}

s4.oninput = function() {
    v4.innerHTML = (this.value / 100).toFixed(2);
  }
s5.oninput = function() {
    v5.innerHTML = (this.value / 100).toFixed(2);
}
s6.oninput = function() {
    v6.innerHTML = (this.value / 100).toFixed(2);
}

s7.oninput = function() {
    v7.innerHTML = (this.value / 100).toFixed(2);
  }
s8.oninput = function() {
    v8.innerHTML = (this.value / 100).toFixed(2);
}
s9.oninput = function() {
    v9.innerHTML = (this.value / 100).toFixed(2);
}

s10.oninput = function() {
    v10.innerHTML = (this.value / 100).toFixed(2);
}
s11.oninput = function() {
    v11.innerHTML = (this.value / 100).toFixed(2);
}
s12.oninput = function() {
    v12.innerHTML = (this.value / 100).toFixed(2);
}

s13.oninput = function() {
    v13.innerHTML = (this.value / 100).toFixed(2);
  }
s14.oninput = function() {
    v14.innerHTML = (this.value / 100).toFixed(2);
}
s15.oninput = function() {
    v15.innerHTML = (this.value / 100).toFixed(2);
}

s16.oninput = function() {
    v16.innerHTML = (this.value / 100).toFixed(2);
  }
s17.oninput = function() {
    v17.innerHTML = (this.value / 100).toFixed(2);
}
s18.oninput = function() {
    v18.innerHTML = (this.value / 100).toFixed(2);
}
