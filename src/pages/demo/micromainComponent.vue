<template>
  <div class="micromainComponent">
    <section class="-m-card lightblue">
      <span class="-m-title">Dialog弹窗</span>
      <button @click="dataDialog.open()">点击弹窗</button>
    </section>

    <!-- 弹窗 -->
    <base-dialog
      :title="dataDialog.title"
      v-model="dataDialog.show"
      width="700px"
    >
      <section>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta accusantium ab
        veniam, sit ducimus inventore dignissimos nostrum harum, sequi labore quia quod
        culpa est deserunt quo quos, blanditiis eligendi ratione in enim atque vero nisi
        iste. Quis minima hic voluptatibus tenetur minus in, sequi accusantium, eaque
        eligendi, culpa suscipit optio ex aut fuga veniam ipsa ratione distinctio maiores
        similique. Cumque ratione ducimus architecto laudantium natus laborum animi
        cupiditate incidunt, provident voluptates, libero harum porro. Veritatis ut,
        libero, tempore voluptates at, impedit vel ab itaque voluptatibus temporibus
        repudiandae. Harum, asperiores consequuntur inventore suscipit quisquam provident.
        Aliquid dolorum impedit rerum laboriosam laudantium, architecto repudiandae
        aperiam excepturi perspiciatis id nesciunt accusantium incidunt sequi vero beatae,
        ratione officia quae alias est cupiditate? Error molestias velit optio doloremque
        necessitatibus nemo voluptatum eaque officia quia laborum at, beatae nesciunt.
        Ullam corrupti et placeat, dolores nostrum ut, facilis nisi accusantium incidunt
        qui molestias deleniti eligendi ad praesentium perferendis? Blanditiis facilis
        consequatur repudiandae nulla explicabo, vero aliquid! Maiores omnis odio id amet
        in assumenda modi libero. Cupiditate repudiandae ea voluptas facilis temporibus
        rerum voluptate distinctio minus placeat? Ducimus voluptatem alias eligendi quia
        ex molestiae, iste eveniet suscipit hic eius dolores, totam consequatur minus
        nesciunt excepturi in a provident iusto, quod asperiores optio reprehenderit
        repudiandae beatae? Eius repudiandae quidem eaque, labore quo doloribus aliquam
        distinctio ducimus tempora eveniet ratione. Deserunt sapiente libero doloribus ab
        incidunt a corporis aperiam officiis dolores iste quisquam facilis, qui quos iure
        quidem laborum consequatur. Qui enim nemo porro incidunt similique doloremque,
        necessitatibus possimus illo deleniti quis sequi veritatis mollitia, totam ex
        facere earum quos. Ex doloremque excepturi quae, facilis, libero nemo labore ut
        quaerat magnam veniam, unde eos voluptatum? Esse similique eveniet numquam optio
        porro ea dolor vero officia et doloribus earum fuga ab illum repudiandae, at in,
        adipisci ex velit commodi, reiciendis eaque. Vel sit quibusdam nulla iste quis
        unde cupiditate quidem perferendis temporibus laboriosam, maxime optio, illo, ut
        officia nesciunt. Laborum accusamus maxime est voluptatum, nulla asperiores sit.
        Dolorum accusantium culpa temporibus ad nobis error, in perferendis ab quos
        possimus necessitatibus fugit maiores, tenetur perspiciatis porro aspernatur
        consequatur, neque ratione vitae nihil! Beatae distinctio illum voluptas alias,
        rem ad suscipit, blanditiis eligendi, recusandae facilis consequatur excepturi?
      </section>
      <template #footer>
        <el-button
          type="primary"
          @click="dataDialog.submit"
          >确定</el-button
        >
        <el-button @click="dataDialog.cancel">取消</el-button>
      </template>
    </base-dialog>
  </div>
</template>

<script lang="ts" setup>
import { shallowReactive } from 'vue';
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/index.mjs';
import BaseDialog from '@/components/base-dialog/index.vue';

const dataDialog = shallowReactive({
  show: false,
  title: '弹窗测试',
  open() {
    this.show = true;
  },
  submit() {
    this.cancel();
  },
  cancel() {
    this.show = false;
  },
});
</script>

<style lang="scss" scoped>
.micromainComponent {
}
</style>
