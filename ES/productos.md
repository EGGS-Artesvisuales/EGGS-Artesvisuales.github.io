---
layout: es-producto
title: "Tienda de Impresiones"
permalink: /ES/productos/
---

# Tienda de Impresiones

<div class="productos-container">
  {% for producto in site.pages %}
    {% if producto.path contains 'ES/productos/' %}
      <div class="producto-card">
        <a href="{{ producto.url }}">
          <img src="{{ producto.image }}" alt="{{ producto.title }}">
          <h3>{{ producto.title }}</h3>
          <p>Precio: ${{ producto.price }}</p>
        </a>
      </div>
    {% endif %}
  {% endfor %}
</div>
