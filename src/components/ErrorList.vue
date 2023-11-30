<template>
  <div>
    <table ref="dataTable" class="display">
      <thead>
      <tr>
        <th>Hostname</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Unack</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(error, index) in fehlerliste" :key="index">
        <td>{{ error.Hostname }}</td>
        <td>{{ error.Description }}</td>
        <td>{{ error.Priority }}</td>
        <td>{{ error.Unack }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";

export default {
  data() {
    return {
      fehlerliste: []
    };
  },
  mounted() {
    import("../components/fehlerliste.json").then((data) => {
      this.fehlerliste = data.default;

      // Hier wird DataTables initialisiert
      $(this.$refs.dataTable).DataTable();
    });
  },
  };
</script>

<style>
*,*:after,*:before{
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}

input,select{
  background-color: var(--light);;
}

table thead tr td,
table thead tr th,
table tfoot tr td,
table tfoot tr th{
  background-color: var(--primary);
  color: #fff;
}
</style>
