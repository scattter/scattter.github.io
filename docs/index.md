---
layout: home

head:
  - - script
    - type: text/javascript
    - "window._AMapSecurityConfig = {
        serviceHost: 'http://scatter-zk.tk/_AMapService',
      }"
  - - script
    - type: text/javascript
      src: 'https://webapi.amap.com/maps?v=1.4.15&key=3003cca968b1aed5bf0002b2fdc3e774'
---

<script setup>
import home from './components/home.vue'
</script>
<home />

