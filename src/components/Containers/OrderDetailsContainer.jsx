import React from "react";

export default function OrderDetailsContainer(props) {
  return (
    <div class="order-detail card margintop30 padding15">
      <div id="print-section">{props.children}</div>
    </div>
  );
}
