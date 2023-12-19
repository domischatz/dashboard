<template>
  <div>
    <table id="errorList" class="display">
<!--      <table id="example" class="hover" style="width:100%">-->
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
      dataTable: null,
    };
  },
  methods: {
    goToDetailsPage(rowData) {
      // Find the corresponding entry in datenHost.json based on hostid
      const selectedData = this.datenHost.find(item => item.hostid === rowData.hostid);

      // Use this.$router.push to navigate to another page with the selectedData
      this.$router.push({ name: "DatenHost", query: {datenHost: JSON.stringify(selectedData) } });
    },
    initializeDataTable() {
      if (this.dataTable) {
        // Destroy the existing DataTable
        this.dataTable.destroy();
      }

      // Initialize DataTable
      this.dataTable = $(this.$el).find("table").DataTable({
        // DataTable options here
      });
    },
  },
  watch: {
    // Watch for changes in fehlerliste and reinitialize DataTable
    fehlerliste: {
      handler() {
        this.$nextTick(() => {
          this.initializeDataTable();
        });
      },
      deep: true,
    },
  },
  mounted() {
    // Load fehlerliste.json
    import("../data/fehlerliste.json").then((data) => {
      this.fehlerliste = data.default;
    });
    // Load datenhost.json
    import("../data/datenHost.json").then(data => {
      this.datenHost = data.default;
    });
  },
};
</script>

<style>
input,
select {
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
