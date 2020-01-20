<template>
  <v-app>
    <v-form
      @submit="submit"
      v-model="valid"
    >
      <v-card-title>
        Formulir Pendaftaran
      </v-card-title>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-card>
              <v-card-title>Data Peserta</v-card-title>
              <v-card-text>
                <v-text-field
                 v-model="data.nama"
                 label="Nama Lengkap"
                 :rules="[$formRules.required]"
                ></v-text-field>

                <v-row>
                  <v-col>
                    <v-text-field
                     v-model="data.ttl.tempat"
                     label="Tempat Lahir"
                     :rules="[$formRules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-menu
                      v-model="menus.tgl_lahir"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="data.ttl.tgl"
                          label="Tanggal Lahir"
                          :rules="[$formRules.required]"
                          append-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="data.ttl.tgl" @input="menus.tgl_lahir = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-radio-group
                v-model="data.sex"
                label="Jenis Kelamin"
                >
                  <v-radio
                    v-for="n in ['Laki - Laki', 'Perempuan']"
                    :key="n"
                    :label="`${n}`"
                    :value="n"
                  ></v-radio>
                </v-radio-group>

                <v-text-field
                  v-model="data.nisn"
                  label="NISN"
                  :rules="[$formRules.required]"
                ></v-text-field>

                <v-text-field
                  v-model="data.no_hp"
                  label="No. Hp / Wa Peserta"
                  hint="(*) Usahakan No. yang aktif / bisa dihubungi"
                  :rules="[$formRules.required]"
                ></v-text-field>

                <v-textarea
                  v-model="data.alamat"
                  label="Alamat Peserta"
                  :rules="[$formRules.required]"
                  hint="(*) Masukan Alamat yang lengkap. Meliputi nama jalan / gedung, RT/RW, Desa / Kelurahan, Kecamatan, Kabupaten, dan Provinsi"
                >
                  
                </v-textarea>

                <v-row>
                  <v-col cols="12" md="6">
                     <v-select
                      v-model="data.detail.status_anak"
                      label="Status dalam Keluarga"
                      :items="['Kandung', 'Angkat']"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                     <v-select
                      v-model="data.detail.anak_ke"
                      label="Anak ke"
                      :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card class="mt-5">
              <v-card-title>
                Latar Belakang Pendidikan
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col
                    cols="12"
                    sm="4"
                  >
                    <v-select
                      v-model="data.asal_sekolah.jenis"
                      :items="['Negri', 'Swasta']"
                      label="Asal Sekolah"
                      :rules="[$formRules.required]"
                    ></v-select>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="8"
                  >
                    <v-text-field
                      v-model="data.asal_sekolah.nama"
                      label="Nama Asal Sekolah"
                      :rules="[$formRules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
          >
            <v-card>
              <v-card-title>
                Data Orang Tua
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="data.ortu.nama_ayah"
                      label="Nama Ayah"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="data.ortu.nama_ibu"
                      label="Nama Ibu"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="data.ortu.pekerjaan_ayah"
                      label="Pekerjaan Ayah"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="data.ortu.pekerjaan_ibu"
                      label="Pekerjaan Ibu"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="data.ortu.no_ortu"
                  label="No. Hp Orang Tua"
                ></v-text-field>
                <v-textarea
                  label="Alamat Orang Tua"
                  v-model="data.ortu.alamat_ortu"
                >
                </v-textarea>

              </v-card-text>
            </v-card>

            <v-card class="mt-5">
              <v-card-title>
                Data Wali
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="data.ortu.nama_wali"
                      label="Nama wali"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="data.ortu.pekerjaan_wali"
                      label="Pekerjaan wali"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="data.ortu.no_wali"
                  label="No. Hp Wali"
                ></v-text-field>
                <v-textarea
                  label="Alamat Wali"
                  v-model="data.ortu.alamat_wali"
                >
                </v-textarea>

              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" md="12">
            <v-card>
              <v-card-title>Prestasi yang pernah diraih</v-card-title>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Jenis</th>
                      <th>Nama</th>
                      <th>Tahun</th>
                      <th>Peringkat</th>
                      <th>Tingkat</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr  v-for="(item, index) in data.prestasi" v-bind:key="index">
                      <td>
                        <v-select
                        v-model="item.jenis"
                        :items="['Akademik', 'Non Akademik']"
                        >
                        </v-select>
                      </td>
                      <td>
                        <v-text-field
                          v-model="item.nama"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-text-field
                        v-model="item.tahun"
                        ></v-text-field>
                      </td>
                      <td>
                        <v-select
                          v-model="item.peringkat"
                          :items="[1,2,3]"
                        ></v-select>
                      </td>
                      <td>
                        <v-select
                          v-model="item.tingkat"
                          :items="['Desa', 'Kecamatan', 'Kabupaten', 'Provinsi', 'Nasional', 'Internasional', 'Dunia']"
                        ></v-select>
                      </td>
                      <td>
                        <v-btn @click="hapusPrestasi(index)" color="red" icon>
                          <v-icon>mdi-delete-outline</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-actions>
                <v-btn small color="primary" @click="addPrestasi" rounded outlined>
                  <v-icon left>mdi-plus</v-icon> Tambah Prestasi
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col>
            <v-btn
              @click="submit"
              :disabled="!valid"
              color="success"
              rounded
            ><v-icon left>mdi-check</v-icon> Simpan Biodata Peserta</v-btn>
          </v-col>
        </v-row>

      </v-container>
    </v-form>
  </v-app>
</template>
<script>
  export default {
    data () {
      return {
        id: this.$route.params.id,
        valid: false,
        menus: {
          tgl_lahir: false
        },
        db: { 
          jurusan: [],
          sumber: [],
        },
        data: {
          nama: '',
          sex: null,
          email: '',
          no_hp: '',
          nisn: '',
          alamat: '',
          ttl: {
            tempat: '',
            tgl: this.$moment('2000-1-1').format('YYYY-MM-DD')
          },
          asal_sekolah: {
            jenis: null,
            nama: ''
          },
          detail: {
            status_anak: null,
            anak_ke: null,
          },
          ortu: {
            nama_ayah: '',
            nama_ibu: '',
            pekerjaan_ayah: '',
            pekerjaan_ibu: '',
            alamat_ortu: '',
            no_ortu: '',

            nama_wali: '',
            pekerjaan_wali: '',
            alamat_wali: '',
            no_wali: '',
          },
          prestasi: []
        }
      }
    },
    methods: {
      addPrestasi:function () {
          this.data.prestasi.push({
            type: null,
            nama: '',
            tahun: '',
            peringkat: null,
            tingkat: null,
          });
      },
      hapusPrestasi: function (index) {
        window.console.log(index);
        this.data.prestasi.splice(index, 1);
      },
      getPeserta: function () {
        this.axios.get('peserta/show/' + this.id).then((d) => {
          this.data.nama = d.data.nama;
          this.data.ttl = d.data.ttl;
          this.data.sex = d.data.sex;
          this.data.no_hp = d.data.no_hp;
          this.data.nisn = d.data.nisn;
          this.data.alamat = d.data.alamat;
          this.data.asal_sekolah = d.data.asal_sekolah;
          if (d.data.ortu) this.data.ortu = d.data.ortu;
          if (d.data.detail) this.data.detail = d.data.detail;
          if (d.data.prestasi) this.data.prestasi = d.data.prestasi;
        });
      },

      submit: function () {
        return this.axios.post('peserta/update/' + this.id, this.data).then((d) => {
          window.console.log(d);
            this.$pesan.pesan(d.data.status, d.data.pesan);
         })
      }
    }, 
    created () {
      this.getPeserta();
    }
  }
</script>