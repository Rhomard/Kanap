let onPageUrl = window.location;
let url = new URL(onPageUrl);
let id = url.searchParams.get("orderId");

const orderId = (document.getElementById("orderId").innerText = id);