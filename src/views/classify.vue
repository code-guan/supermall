<template>
  <div>
    <h3>我是 classify 组件</h3>
    <div class="wrapper">
      <ul class="scroll">
        <li>我是第1</li>
        <li>我是第2</li>
        <li>我是第3</li>
        <li>我是第4</li>
        <li>我是第5</li>
        <li>我是第6</li>
        <li>我是第7</li>
        <li>我是第8</li>
        <li>我是第9</li>
        <li>我是第10</li>
        <li>我是第11</li>
        <li>我是第12</li>
        <li>我是第13</li>
        <li>我是第14</li>
        <li>我是第15</li>
        <li>我是第16</li>
        <li>我是第17</li>
        <li>我是第18</li>
        <li>我是第19</li>
        <li>我是第20</li>
        <li>我是第21</li>
        <li>我是第22</li>
        <li>我是第23</li>
        <li>我是第24</li>
        <li>我是第25</li>
        <li>我是第26</li>
        <li>我是第27</li>
        <li>我是第28</li>
        <li>我是第29</li>
        <li>我是第30</li>
        <li>我是第31</li>
        <li>我是第32</li>
        <li>我是第33</li>
        <li>我是第34</li>
        <li>我是第35</li>
        <li>我是第36</li>
        <li>我是第37</li>
        <li>我是第38</li>
        <li>我是第39</li>
        <li>我是第40</li>
        <li>我是第41</li>
        <li>我是第42</li>
        <li>我是第43</li>
        <li>我是第44</li>
        <li>我是第45</li>
        <li>我是第46</li>
        <li>我是第47</li>
        <li>我是第48</li>
        <li>我是第49</li>
        <li>我是第50</li>
        <li>我是第51</li>
        <li>我是第52</li>
        <li>我是第53</li>
        <li>我是第54</li>
        <li>我是第55</li>
        <li>我是第56</li>
        <li>我是第57</li>
        <li>我是第58</li>
        <li>我是第59</li>
        <li>我是第60</li>
        <li>我是第61</li>
        <li>我是第62</li>
        <li>我是第63</li>
        <li>我是第64</li>
        <li>我是第65</li>
        <li>我是第66</li>
        <li>我是第67</li>
        <li>我是第68</li>
        <li>我是第69</li>
        <li>我是第70</li>
        <li>我是第71</li>
        <li>我是第72</li>
        <li>我是第73</li>
        <li>我是第74</li>
        <li>我是第75</li>
        <li>我是第76</li>
        <li>我是第77</li>
        <li>我是第78</li>
        <li>我是第79</li>
        <li>我是第80</li>
        <li>我是第81</li>
        <li>我是第82</li>
        <li>我是第83</li>
        <li>我是第84</li>
        <li>我是第85</li>
        <li>我是第86</li>
        <li>我是第87</li>
        <li>我是第88</li>
        <li>我是第89</li>
        <li>我是第90</li>
        <li>我是第91</li>
        <li>我是第92</li>
        <li>我是第93</li>
        <li>我是第94</li>
        <li>我是第95</li>
        <li>我是第96</li>
        <li>我是第97</li>
        <li>我是第98</li>
        <li>我是第99</li>
        <li>我是第100</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true
    });

    // this.scroll.on("scroll", position => {
    //   console.log(position);
    // });

    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多");

      setTimeout(() => {
        this.scroll.finishPullUp();
      }, 2000);
    });
  }
};
</script>

<style scoped>
.wrapper {
  height: 150px;
  background: skyblue;
}
</style>
