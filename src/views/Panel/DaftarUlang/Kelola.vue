<template>
  <v-app>
    <v-container>
      <h3>{{ $route.meta.title }}</h3>
      <v-form v-model="valid">
        <v-row>
          <v-col cols="12" md="4">
            <v-card>
              <v-card-text>
                <v-select
                  v-model="data.jurusan"
                  :items="db.jurusan"
                  item-text="nama"
                  item-value="kode"
                  label="Jurusan"
                  :rules="[$formRules.length(1)]"
                  multiple
                ></v-select>

                <v-select
                  v-model="data.sex"
                  :items="['Laki - Laki', 'Perempuan']"
                  label="Jenis Kelamin"
                  :rules="[$formRules.length(1)]"
                  required
                  multiple
                ></v-select>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="8">
            <v-card>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Jenis</th>
                      <th>Seharusnya</th>
                      <th>Subsidi</th>
                      <th>Dibayar</th>
                      <th>Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in data.detail" v-bind:key="index">
                      <td>
                        <v-text-field
                         v-model="item.uraian"
                         :rules="[$formRules.required]"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                         type="number"
                         v-model="item.seharusnya"
                         :rules="[$formRules.required]"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                         type="number"
                         v-model="item.subsidi"
                        ></v-text-field>
                      </td>
                      <td>
                        {{ item.seharusnya - item.subsidi }}
                      </td>
                      <td>
                        <v-text-field
                         v-model="item.keterangan"
                        ></v-text-field>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-actions>

                <v-btn small color="primary" @click="addRincian" rounded outlined>
                  <v-icon left>mdi-plus</v-icon> Tambah Item
                </v-btn>

              </v-card-actions>
            
            </v-card>
          </v-col>
        </v-row>
      </v-form>
      <v-btn @click="submit" :disabled="!valid" color="success" rounded>
        <v-icon>mdi-check</v-icon> Simpan Rincian Biaya Daftar Ulang
      </v-btn>
    </v-container>
  </v-app>
</template>
<script>
  export default{
    data () {
      return {
        id: this.$route.params.id,
        valid: false,
        data: {
          jurusan: [], 
          sex: [], 
          detail: []
        },
        db: {
          jurusan: []
        }
      }
    },
    methods: {
      addRincian: function () {
        this.data.detail.push({
          uraian: '',
          seharusnya: 0,
          subsidi: 0,
          keterangan: ''
        })
      },
      getJurusan: function () {
        return this.axios.get('master/jurusan').then((d) => {
          this.db.jurusan = d.data;
         })
      },

      getRincian: function () {
        return this.axios.get('daftar_ulang/rincian/show/' + this.id).then((d) => {
          this.data = d.data;
         })
      },
      
      
      submit: function () {
        return this.axios.post('daftar_ulang/rincian/action', this.data).then((d) => {
            window.console.log(d);
            this.$pesan.pesan(d.data.status, d.data.pesan);
            this.$router.replace({
              name: 'RincianDaftarUlangLists'
            })
         })
      }

    },
    created () {
      if (this.id) this.getRincian();
      this.getJurusan();
    }
  }
</script>