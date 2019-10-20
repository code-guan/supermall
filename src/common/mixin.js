import { deboundce } from "./utils";
import BackTop from "components/common/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      refresh: null
    };
  },
  mounted() {
    this.refresh = deboundce(this.$refs.scroll.refresh, 50);

    this.itemImageListener = () => {
      this.refresh();
    };

    this.$bus.$on("ItemImageLoad", this.itemImageListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
};
