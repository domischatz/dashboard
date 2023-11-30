<template>
  <div>
    <h2>Fehlerliste</h2>
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
/* Stilregeln für die Tabelle können hier hinzugefügt werden */
table {
  border-collapse: collapse;
  width: 100%;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}
</style>
