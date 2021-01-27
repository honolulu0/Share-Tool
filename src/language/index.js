import Vue from 'vue'
import store from '../store/store'
import VueI18n from 'vue-i18n'
import elzh from 'element-ui/lib/locale/lang/zh-CN'; // 中文简体
import elts from 'element-ui/lib/locale/lang/zh-TW'; // 中文繁体
import elen from 'element-ui/lib/locale/lang/en'; // 英文
Vue.use(VueI18n)
export default new VueI18n({
    locale: store.state.user.Language || store.state.user.Language.lang || 'en',
    silentTranslationWarn: true,
    messages: {
      zh: {
        ...require('./lang/zh'),
        ...elzh
      },
      en: {
        ...require('./lang/en'),
        ...elen
      },
      ts: {
        ...require('./lang/ts'),
        ...elts
      }
    }
  })
