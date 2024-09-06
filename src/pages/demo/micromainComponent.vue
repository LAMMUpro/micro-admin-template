<template>
  <div class="micromainComponent">
    <section class="-m-card lightblue">
      <span class="-m-title">自定义Dialog弹窗</span>
      <button @click="dataDialog.open()">点击弹窗</button>
    </section>

    <section class="-m-card lightcoral">
      <span class="-m-title">Element-Plus Dialog弹窗</span>
      <button @click="dataElDialog.open()">点击弹窗</button>
    </section>

    <!-- 自定义弹窗组件 -->
    <base-dialog
      :title="dataDialog.title"
      v-model="dataDialog.show"
      width="60%"
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

    <!-- el-dialog二次封装的组件 -->
    <el-dialog
      v-model="dataElDialog.show"
      :title="dataElDialog.title"
      width="60%"
    >
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore similique,
        quisquam pariatur harum deserunt fugiat doloribus corporis ratione obcaecati magni
        adipisci asperiores saepe, officia aperiam. Nostrum sapiente reiciendis animi
        libero cumque rem voluptatem quisquam itaque aperiam ex, ab molestiae laboriosam
        est quam, illo ad illum quod. Omnis, reiciendis inventore deserunt nisi neque ab
        aspernatur aliquam ducimus iusto ad dicta dolorem unde labore quisquam facilis
        nesciunt, voluptates id. Molestiae, eligendi suscipit optio voluptatibus porro
        nobis tempora molestias vitae officia. Minima, obcaecati? Distinctio blanditiis
        voluptatibus dignissimos animi expedita itaque ab cum accusantium. Debitis et
        obcaecati laborum. Quam consectetur voluptatum voluptates maiores sunt modi nobis.
        Beatae sequi tenetur illo maxime repellendus accusantium quo provident, ea tempore
        libero odit. Itaque fuga dicta vitae ut quibusdam commodi? Veritatis possimus
        officiis, itaque sint tempora magnam repellat esse ipsa voluptas iure officia,
        aliquam dolore. Deserunt nemo quam repudiandae. Expedita provident eius voluptatum
        hic tenetur saepe veniam distinctio. Doloribus quidem, autem nostrum minima
        cupiditate rerum accusamus qui ipsum iure placeat omnis cumque, reiciendis sequi
        quasi velit repudiandae cum necessitatibus? Saepe eligendi voluptatem nesciunt
        reiciendis molestiae facilis eum. Laboriosam ad unde aperiam praesentium,
        distinctio fugit assumenda? Architecto praesentium, excepturi porro accusamus
        officiis ut libero consequatur neque assumenda necessitatibus laborum repellendus
        amet magnam harum sed nobis sunt quidem earum, similique dignissimos! Aperiam
        magni, odio ullam dolorem aliquid quos incidunt placeat distinctio sapiente, totam
        hic nesciunt necessitatibus recusandae autem? Odio natus, ut voluptate tempora quo
        accusantium possimus voluptas error harum illo nemo aut, ipsa ipsum. Repudiandae
        ex recusandae eveniet quaerat alias perferendis quasi animi ullam dolorum cumque
        consequatur, debitis autem blanditiis quisquam obcaecati voluptates quae
        distinctio enim natus esse! Dolor eveniet hic obcaecati veniam maiores velit. Vel
        nulla perferendis nisi in eius temporibus sit voluptates modi repellendus
        inventore! Nobis debitis iste expedita, animi magnam eum exercitationem eaque,
        cumque pariatur, aliquam obcaecati hic voluptate id porro recusandae! Repellendus
        hic fugiat eveniet, aspernatur repellat, nisi magni consequatur distinctio
        praesentium fuga accusamus. Expedita culpa doloremque tempora magni fugit numquam?
        Officiis rem eaque fugiat molestiae illum sunt neque voluptatibus non, sint, ullam
        in corporis inventore ex necessitatibus expedita voluptatum provident tempore
        nesciunt impedit nobis cumque perspiciatis id commodi. Nam tempore maiores
        assumenda suscipit saepe expedita cumque accusamus ipsum corrupti esse nesciunt
        ipsam facere a ratione numquam iusto, nostrum non quisquam perferendis quo?
        Corrupti minima blanditiis ex. Perspiciatis voluptatum porro voluptatem facere
        sunt ipsa dicta eligendi illum, quis laboriosam quas eaque a eos sequi odio ab
        provident deleniti voluptatibus expedita modi. Recusandae blanditiis ut velit
        dignissimos reiciendis aliquam obcaecati deleniti, consectetur expedita, maxime
        mollitia molestias, quis rerum ratione! Soluta rem perferendis facere dolor culpa
        iusto sit totam eveniet, ipsa eius aliquam nisi mollitia quasi cupiditate quos
        fuga omnis repellendus excepturi ad alias, ducimus molestias facilis numquam!
        Veniam veritatis laboriosam eius doloremque quibusdam voluptatibus quisquam
        maiores voluptas aperiam cumque voluptates molestias, quia accusantium iure
        sapiente perferendis ex consequuntur culpa nulla ab sunt debitis. Inventore ullam
        voluptas consequatur incidunt fuga porro voluptate dicta! Quisquam dolor
        exercitationem accusantium soluta porro. At quia delectus minima! Itaque cumque
        delectus numquam odit.
      </div>
      <template #footer>
        <el-button
          type="primary"
          @click="dataDialog.submit"
          >确定</el-button
        >
        <el-button @click="dataDialog.cancel">取消</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { shallowReactive } from 'vue';
import { ElButton } from 'element-plus';
import 'element-plus/es/components/button/style/index';
import BaseDialog from '@/components/base-dialog/index.vue';
import ElDialog from '@/components/el-dialog/index.vue';

const dataDialog = shallowReactive({
  show: false,
  title: '自定义弹窗测试',
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

const dataElDialog = shallowReactive({
  show: false,
  title: 'el-dialog二次封装弹窗测试',
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
