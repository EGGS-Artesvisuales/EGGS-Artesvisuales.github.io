---
layout: default-chn
lang: zh-Hans
title: "联系 – EGGS-Studio"
description: "联系 Esteban Garnica / EGGS-Studio：购买作品、咨询委托创作、修复、工作坊、教学、布展或文化合作。"
permalink: /CHN/contacto.html
es_url: /ES/contacto.html
en_url: /EN/contact.html
mpd_url: /MPD/contacto.html
keywords: "EGGS-Studio, Esteban Garnica, 联系, 购买作品, 壁画委托, 艺术修复, 工作坊, 智利"
---

<h1 class="titulo">联系</h1>

<h2 class="subtitulo">购买作品、报价、委托与合作</h2>

<p class="parrafo">
  你可以通过此表格咨询作品购买、库存确认、项目报价、艺术修复、工作坊、教学或文化合作。信息越具体，回复越快。
</p>

<div class="button-container">
  <a href="/CHN/tienda.html#impresiones-y-fotografia" class="fancy-button"><div class="button-content"><img src="/assets/img/pinf-blds-upg-retr-003b.jpg" alt="购买作品" loading="lazy"><p class="title">购买作品</p><p class="subtitle">艺术微喷、摄影与可售限量版。</p></div></a>
  <a href="/CHN/servicios.html" class="fancy-button"><div class="button-content"><img src="/assets/img/encargos-boton.webp" alt="项目报价" loading="lazy"><p class="title">项目报价</p><p class="subtitle">壁画、委托、修复与布展。</p></div></a>
  <a href="/CHN/docencia.html" class="fancy-button"><div class="button-content"><img src="/assets/img/index---gif--accion-en-el-mundo.webp" alt="工作坊与教学" loading="lazy"><p class="title">工作坊与教学</p><p class="subtitle">教育、艺术中介与社区过程。</p></div></a>
</div>

<div class="service-cta">
  <h2 class="subtitulo2">请在留言中写明</h2>
  <p class="parrafo">
    购买作品：作品名称或 SKU。项目报价：地点、尺寸、照片、预计日期、预算范围与项目目标。工作坊：对象、时长、地点、人数与可用材料。
  </p>
</div>

<form class="contact-form" name="contact-chn" action="/CHN/gracias.html" method="POST" data-netlify="true" netlify-honeypot="bot-field" data-contact-lang="chn">
  <input type="hidden" name="form-name" value="contact-chn">
  <p hidden><label>请勿填写：<input name="bot-field"></label></p>

  <label for="name">姓名：</label>
  <input type="text" id="name" name="name" autocomplete="name" required placeholder="您的姓名">

  <label for="email">电子邮件：</label>
  <input type="email" id="email" name="email" autocomplete="email" required placeholder="您的电子邮箱">

  <label for="topic">主题：</label>
  <select id="topic" name="topic" required>
    <option value="">请选择一项</option>
    <option value="Artwork purchase">购买作品</option>
    <option value="Commission or mural">委托创作或壁画</option>
    <option value="Restoration">艺术修复</option>
    <option value="Workshops and teaching">工作坊与教学</option>
    <option value="Installation or atmosphere">布展或空间视觉</option>
    <option value="Press or collaboration">媒体或合作</option>
  </select>

  <label for="message">信息：</label>
  <textarea id="message" name="message" rows="7" required placeholder="请说明你的需求、地点、时间，以及已有的参考、尺寸或照片。"></textarea>

  <button type="submit">发送咨询</button>
</form>

<script src="/assets/js/contact-product.js" defer></script>

<br><br><br>
