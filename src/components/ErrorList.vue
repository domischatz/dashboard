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
      <tr v-for="(error, index) in fehlerliste" :key="index" @click="goToDetailsPage(error)">
        <td>{{ error.hostname }}</td>
        <td>{{ error.description }}</td>
        <td>{{ error.priority }}</td>
        <td>{{ error.unack }}</td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <th>Hostname</th>
        <th>Description</th>
        <th>Priority</th>
        <th>Unack</th>
      </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.min.css";

export default {
  data() {
    return {
      fehlerliste: [],
      datenHost: [],
    };
  },
  methods: {
    goToDetailsPage(rowData) {
      // Find the corresponding entry in datenHost.json based on hostid
      const selectedData = this.datenHost.find(item => item.hostid === rowData.hostid);

      // Use this.$router.push to navigate to another page with the selectedData
      this.$router.push({ name: "DatenHost", query: {datenHost: JSON.stringify(selectedData) } });
    },
  },
  mounted() {
    // Load fehlerliste.json
    import("../data/fehlerliste.json").then(data => {
      this.fehlerliste = data.default;
      const dataTable = $(this.$refs.dataTable).DataTable();
    });

    // Load datenhost.json
    import("../data/datenHost.json").then(data => {
      this.datenHost = data.default;
    });
  },
};
</script>

<style>
input, select {
  background-color: var(--light);
}

table thead tr td,
table thead tr th,
table tfoot tr td,
table tfoot tr th {
  background-color: var(--primary);
  color: #fff;
}
</style>
