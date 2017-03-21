<template>
<div class="col-sm-3 col-md-2 sidebar">
  <ul class="nav nav-sidebar" v-if="anchors">
    <template v-for="anchor in anchors">
      <router-link tag="li" :to="{ path:'#' + anchor.id, query: $route.query}"><a v-bind:class="{ sectionlink: anchor.classList.contains('main-anchor') }">{{anchor.title}}</a></router-link>
</template>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      anchors: []
    }
  },
  methods: {
    parseAnchors() {
      var tmp = []
      var elems = $('.anchor')
      for (var i = 0; i < elems.length; i++) {
        tmp.push(elems[i])
      }
      this.anchors = tmp
    }
  },
  mounted() {
    $(document).ready(function() {
      $(document).on("scroll", onScroll);

      //smoothscroll
      $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        $(document).off("scroll");

        $('a').each(function() {
          $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
          menu = target;
        $target = $(target);
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top + 2
        }, 500, 'swing', function() {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
        });
      });
    });

    function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#menu-center a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('#menu-center ul li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
  }
  }
}
</script>

<style>
.nav-sidebar {
  margin-right: -21px;
  margin-bottom: 20px;
  margin-left: -20px;
}

.nav-sidebar>li>a {
  padding-right: 20px;
  padding-left: 40px;
  font-weight: 500;
  color: #34495e;
}

a.sectionlink {
  padding-left: 30px !important;
  font-weight: 600 !important;
}

.nav-sidebar>li>a>i {
  float: right;
  margin-right: 10px;
  top: 5px;
  font-size: 0.8em;
}

.nav-sidebar>.router-link-active>a,
.nav-sidebar>.active>a,
.nav-sidebar>.active>a:hover,
.nav-sidebar>.active>a:focus {
  color: #fff !important;
  background-color: #337ab7 !important;
}

.nav-sidebar>li>a:hover {
  color: inherit;
  background-color: inherit;
}

.sidebar {
  display: none;
}

@media (min-width: 768px) {
  .sidebar {
    position: fixed;
    top: 50px;
    bottom: 0;
    left: 0;
    z-index: 1000;
    display: block;
    padding: 10px 0px 10px 20px;
    overflow-x: hidden;
    overflow-y: auto;
    /* Scrollable contents if viewport is shorter than content. */
    background-color: #E8E8E8;
  }
}
</style>
