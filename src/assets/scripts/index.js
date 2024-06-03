export async function sendRequestToServer(URL, data, method = "POST") {
  const requestOptions = {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  const response = await fetch(URL, requestOptions);
  return await response.json();
}

export function notify(
  message,
  color = "success",
  delay = 2000,
  stacking = false
) {
  document.querySelectorAll(".notification").forEach((i) => i.remove());

  const notification = document.createElement("div");
  notification.innerHTML = `
    <div class="d-flex justify-content-between gap-4">
      <p class="mb-0">${message}</p>
      <button type="button" class="btn-close" data-mdb-dismiss="alert"></button>
    </div>
  `;
  notification.classList.add("alert", "fade", "shadow-5", "notification");

  document.body.appendChild(notification);

  const notificationInstance = new mdb.Alert(notification, {
    color: color,
    stacking: stacking,
    offset: 20,
    hidden: true,
    position: "top-center",
    autohide: true,
    delay: delay,
    animation: true,
  });

  notificationInstance.show();
}

export function debounce(func, delay = 300) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}
