<template>
  <div>
    <h1>Ingreso de Pagos</h1>
    <form @submit.prevent="agregarPago">
      <div class="form-group">
        <label for="nombre">Nombre del Cliente</label>
        <input v-model="nombre" type="text" id="nombre" class="form-control" required>
        <div v-if="errores.nombre" class="text-danger">{{ errores.nombre }}</div>
      </div>
      <div class="form-group">
        <label for="documento">Número de Documento</label>
        <input v-model="documento" type="text" id="documento" class="form-control" required>
        <div v-if="errores.documento" class="text-danger">{{ errores.documento }}</div>
      </div>
      <div class="form-group">
        <label for="total">Monto Total</label>
        <input v-model.number="total" type="number" id="total" class="form-control" required>
        <div v-if="errores.total" class="text-danger">{{ errores.total }}</div>
      </div>
      <div class="form-group">
        <label for="pago">Pago Realizado</label>
        <input v-model.number="pago" type="number" id="pago" class="form-control" required>
        <div v-if="errores.pago" class="text-danger">{{ errores.pago }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Agregar Pago</button>
    </form>
    <table class="table mt-4" v-if="pagos.length > 0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>DNI</th>
          <th>Total a Pagar</th>
          <th>Pago Efectuado</th>
          <th>Fecha</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pago in pagos" :key="pago.id" :class="getClass(pago)">
          <td>{{ pago.nombre }}</td>
          <td>{{ pago.documento }}</td>
          <td>{{ pago.total }}</td>
          <td>{{ pago.pago }}</td>
          <td>{{ pago.fecha }}</td>
          <td>{{ pago.saldo }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      documento: '',
      total: null,
      pago: null,
      pagos: [],
      errores: {}
    }
  },
  methods: {
    agregarPago() {
      this.errores = {};
      if (!this.nombre) {
        this.errores.nombre = 'El nombre es obligatorio';
      }
      if (!this.documento) {
        this.errores.documento = 'El documento es obligatorio';
      }
      if (this.total === null) {
        this.errores.total = 'El total es obligatorio';
      }
      if (this.pago === null) {
        this.errores.pago = 'El pago es obligatorio';
      }
      if (Object.keys(this.errores).length === 0) {
        const nuevoPago = {
          id: Date.now(),
          nombre: this.nombre,
          documento: this.documento,
          total: this.total,
          pago: this.pago,
          fecha: new Date().toLocaleString('es-ES', { timeZone: 'UTC' }),
          saldo: this.total - this.pago
        };
        this.pagos.push(nuevoPago);
        this.nombre = '';
        this.documento = '';
        this.total = null;
        this.pago = null;
      }
    },
    getClass(pago) {
      if (pago.saldo === 0) {
        return 'table-success';
      } else if (pago.saldo > 0) {
        return 'table-danger';
      } else {
        return 'table-primary';
      }
    }
  }
}
</script>

<style scoped>
.text-danger {
  color: red;
}
</style>
