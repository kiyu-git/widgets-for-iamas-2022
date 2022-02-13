const html = `
<style>
  body {
    margin: 0px;
    padding: 16px;
    color: white;
    font-size: small;
  }
  #wrapper {
    border: 2px solid black;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.8);
    box-sizing: border-box;
    width: 500px;
  }
</style>
<div id="wrapper">
  <h1 id="label"></h1>
  <p>
    <button id="show">表示 | Show</button>
    <button id="hide">非表示 | Hide</button>
  </p>
</div>
<script>
  const show = () => {
    parent.postMessage("show");
  };

  const hide = () => {
    parent.postMessage("hide");
  };

  document.getElementById("show").addEventListener("click", show);
  document.getElementById("hide").addEventListener("click", hide);

  const cb = (widget) => {
    if (widget && widget.property && widget.property.default) {
      document.getElementById("label").textContent = widget.property.default.label;
    }
  };

  addEventListener("message", e => {
    if (e.source !== parent) return;
    cb(e.data);
  });

  cb(${JSON.stringify(reearth.widget)});
</script>
`;

let layer;
layer = getLayer();

reearth.ui.show(html);

reearth.on('update', () => {
  if (reearth.widget?.property?.default) {
    reearth.ui.postMessage(reearth.widget);
    layer = getLayer();
  }
});

reearth.on('message', (msg) => {
  if (msg === 'show') {
    if (layer) {
      reearth.layers.show(layer.id);
    }
  } else if (msg === 'hide') {
    if (layer) {
      reearth.layers.hide(layer.id);
    }
  }
});

function getLayer() {
  const title =
    reearth.widget.property && reearth.widget.property.default ? reearth.widget.property.default.title || '' : '';

  return reearth.layers.find((l) => l.type === 'model' && l.title === title);
}
