const html = `
<style>
  body {
    margin: 0;
    color: white;
  }
  .extendedh { width: 100%; }
  .extendedv { height: 100%; }
  .extendedh body, .extendedh #wrapper { width: 500px; }
  .extendedv body, .extendedv #wrapper { height: 100%; }
  #wrapper {
    border: 2px solid black;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
  }
</style>
<div id="wrapper">
  <h1 id="title"></h1>
  <p id="description"></p>
  <img id="image">
</div>
<script>
  const cb = (widget) => {
    if (widget && widget.property && widget.property.default) {
      document.getElementById("title").textContent = widget.property.default.title;
      document.getElementById("description").textContent = widget.property.default.description;
      document.getElementById("image").src = widget.property.default.image;
    }
  };

  addEventListener("message", e => {
    if (e.source !== parent) return;
    cb(e.data);
  });

  cb(${JSON.stringify(reearth.widget)});
</script>
`;

reearth.ui.show(html);

reearth.on('update', () => {
  if (reearth.widget?.property?.default) {
    reearth.ui.postMessage(reearth.widget);
    console.log('reearth.widget.property:', reearth.widget.property);
  }
});
