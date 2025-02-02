---
layout: producto
title: "Impresión - Arte Digital #1"
image: "/assets/img/impresion001.jpg"
description: "Una impresión de alta calidad inspirada en las pinturas de la serie : paisajes wi fi."
price: "45.00"
sizes:
  - "Pequeño"
  - "Mediano"
  - "Grande"
permalink: /es/productos/impresion001/
---

## {{ page.title }}

<div class="product-detail">
  <div class="product-container">
    
    <!-- Imagen del Producto -->
    <div class="product-images">
      <img src="{{ page.image }}" alt="{{ page.title }}">
    </div>
    
    <!-- Información del Producto -->
    <div class="product-info">
      <h2>{{ page.title }}</h2>
      <p class="parrafo">{{ page.description }}</p>
      <p><strong>Precio:</strong> ${{ page.price }}</p>

      <form action="#" method="POST">
        <label for="size">Tamaño:</label>
        <select name="size" id="size">
          {% for size in page.sizes %}
            <option value="{{ size }}">{{ size }}</option>
          {% endfor %}
        </select>

        <div class="button-container">
          <button type="submit" class="fancy-button">Comprar Ahora</button>
        </div>
      </form>
    </div>

  </div>
</div>

