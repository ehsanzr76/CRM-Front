<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
  >
    <template v-slot:img="props">
      <v-img

      />
    </template>

    <v-divider class="mb-1" />

    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src="data:image/jpeg;base64,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"
            max-height="30"
          />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            class="display-1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >
      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />

      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>

      <!-- Style cascading bug  -->
      <!-- https://github.com/vuetifyjs/vuetify/pull/8574 -->
      <div />
    </v-list>

<!--    <template v-slot:append>-->
<!--      <base-item-->
<!--        :item="{-->
<!--          title: $t('upgrade'),-->
<!--          icon: 'mdi-package-up',-->
<!--          to: '/upgrade',-->
<!--        }"-->
<!--      />-->
<!--    </template>-->
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'داشبورد',
          to: '/',
        },
        {
          icon: 'mdi-account-tie',
          title: 'کارمندان',
          to: '/employees',
        },
        {
          title: 'تامین کنندگان',
          icon: 'mdi-cart-arrow-right',
          to: '/suppliers',
        },
        {
          title: 'دسته بندی ها',
          icon: 'mdi-layers-triple',
          to: '/categories',
        },
        {
          title: 'محصولات',
          icon: 'mdi-bag-checked',
          to: '/products',
        },
        {
          title: 'notifications',
          icon: 'mdi-bell',
          to: '/components/notifications',
        },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          CRM: true,
          title: this.$t('CRM'),
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: this.$t(item.title),
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
