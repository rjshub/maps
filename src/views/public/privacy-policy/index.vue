<template>
  <div class="privacy-container" style="height: calc(100% - 29px)">
    <header class="label">Policies and Procedures</header>
    <main>
      <section class="policy-item">
        <div class="title title_1">Privacy Policy</div>
        <div class="date" >Effective date: 14/5/2020</div>
        <div class="content">
          <p class="content-text" >MAPS is an auxiliary tool that provides the verification function of the advertising platforms’ delivering configuration contents. We at MAPS know you care about how your personal information is used and shared, and we take your privacy seriously.</p>
          <p class="content-text" >This "Privacy Policy" explains what information we gather from our users and how we use it. By using or accessing our Services, you are accepting the practices described in this Privacy Policy.</p>
        </div>
      </section>

      <section class="policy-item">
        <div class="title title_2">What does this Privacy Policy cover?</div>
        <div class="content">
          <p class="content-text" >This Privacy Policy covers our treatment of personally identifiable information (“Personal Information”) that we gather when you are accessing or using our Services, but not to the practices of companies we don’t own or control, or people that we don’t manage. We gather various types of Personal Information from our users, as explained in more detail below, and we use this Personal Information internally in connection with our Services, including to personalize, provide, and improve our services, to allow you to set up a user account and profile, to contact you and allow other users to contact you, to fulfill your requests for certain products and services, and to analyze how you use the Services.</p>
          <p class="content-text" >MAPS is not intended for children under 13 years of age. Consistent with the Federal Children's Online Privacy Protection Act of 1998 ("COPPA"), we will never knowingly gather or use personally identifiable information from anyone under the age of 13, and we do not allow anyone under the age of 13 to register on MAPS.</p>
        </div>
      </section>

      <section class="policy-item">
        <div class="title title_2">What information does MAPS gather?</div>
        <div class="children" >
          <div >
            <div class="title title_3">MAPS gathers and stores <span style="color: rgba(58, 83, 147, 1)">three types</span> of information about users that are subject to our Privacy Policy:</div>
            <ul>
              <li>Information users provide to us: These are voluntary submissions made when creating an account on MAPS or through your use of the Services, such as name and email address. Please understand that when you sign into MAPS or post or upload any content, your information is not anonymous to us.</li>
              <li>Information we collect when users interact with MAPS: We keep track of user interactions with our Services, such as visiting a web page, clicking a button, and choosing a form. Also, we store certain information from their browser using "cookies". “Cookies” are identifiers we transfer to your browser or device that allow us to recognize your browser or device and tell us how and when pages and features in our Services are visited and by how many people. You may be able to change the preferences on your browser or device to prevent or limit your device’s acceptance of cookies, but this may prevent you from taking advantage of some of our features.</li>
              <li>Information we receive from third parties: We do not own or operate any third-party services offered that you may use or interact with through our Services (collectively, "Third Party Services"). Whenever you visit, use or interact with a Third Party Service, we may receive information from them, including information about actions you take and content you post on that service.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="policy-item">
        <div class="title title_2">Why does MAPS gather information about me?</div>
        <div class="content">
          <p class="content-text">MAPS collects information in order to improve the content and quality of our Services and to provide a customized experience tailored to your needs. Any personally identifiable information we collect (including email addresses, physical addresses) is not shared with or sold to other organizations for commercial purposes, except to provide products or services you've requested, when we have your permission, or under special circumstances outlined in this Privacy Policy.</p>
        </div>
      </section>

      <section class="policy-item">
        <div class="title title_2">Is Personal Information about me secure?</div>
        <div class="content">
          <p class="content-text">Your account is protected by a password for your privacy and security.  If you access your account via a third party site or service, you may have additional or different sign-on protections via that third party site or service. You must prevent unauthorized access to your account and Personal Information by selecting and protecting your password and limiting access to your computer or device and browser by signing off after you have finished accessing your account.</p>
          <p class="content-text">We endeavor to protect the privacy of your account and other Personal Information we hold in our records, but unfortunately, we cannot guarantee complete security. Unauthorized entry or use, hardware or software failure, and other factors, may compromise the security of user information at any time.</p>
        </div>
      </section>

      <section class="policy-item">
        <div class="title title_2">What control do I have over my information?</div>
        <div class="children" >
          <div >
            <div class="title title_3">As a registered Member, you may access, and, in some cases, edit or delete the following information you’ve provided to us:</div>
            <ul>
              <li>name and password.</li>
              <li>Advertising Platform (e.g. Facebook, Instagram) account connected.</li>
            </ul>
          </div>
        </div>
        <div class="content">
          <p class="content-text">The information you can view, update, and delete may change as the Services change.  If you have any questions about viewing or updating information we have on file about you, please contact us at <span style="color: rgba(58, 83, 147, 1)">hymaps@hylinkad.com</span>.</p>
          <p class="content-text">You can always opt not to disclose information to us, but keep in mind some information may be needed to register with us or to take advantage of some of our features.</p>
          <p class="content-text">You may be able to add, update, or delete information as explained above.  When you update information, however, we may maintain a copy of the unrevised information in our records. You may request deletion of your account by writing to <span style="color: rgba(58, 83, 147, 1)">hymaps@hylinkad.com</span>. Some information may remain in our records after your deletion of such information from your account. We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally.</p>
        </div>
      </section>

      <section class="policy-item">
        <div class="title title_2">How am I notified of changes to this Privacy Policy?</div>
        <div class="content">
          <p class="content-text">We’re constantly trying to improve our Services, so we may need to change this Privacy Policy from time to time as well, but we will alert you to changes by placing a notice on MAPS, by sending you an email or by some other means.</p>
        </div>
      </section>

      <section class="policy-item">
        <div class="title title_2">Who can I contact about this Privacy Policy?</div>
        <div class="content">
          <p class="content-text">If you have any questions or concerns regarding our privacy policies, please send us a detailed message to <span style="color: rgba(58, 83, 147, 1)">hymaps@hylinkad.com</span>, and we will try to resolve your concerns.</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["isLogin"])
  },
  methods: {
    ...mapActions("user", ["update_is_privacy"]),
  },
  mounted() {
    this.update_is_privacy(false);
  }
};
</script>
<style lang='scss' scoped>
.privacy-container {
  padding: 20px 20px 0 20px;
  background: rgba(241, 242, 248, 1);
  header {
    height: 40px;
    background: rgba(225, 225, 225, 1);
    color: rgba(51, 51, 51, 1);
    font-size: 14px;
    line-height: 40px;
    padding: 0 20px;
  }
  main {
    height: calc(100% - 80px);
    overflow-y: auto;
    background: #fff;
    padding: 0 20px;
    border-top: 20px solid #fff;
    border-bottom: 20px solid #fff;
    .policy-item {
      padding-bottom: 20px;
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      .title {
        color: rgba(51, 51, 51, 1);
        font-weight: bold;
      }
      .title_1 {
        font-size: 30px;
      }
      .title_2 {
        font-size: 24px;
      }
      .title_3 {
        font-size: 16px;
      }

      .date {
        color: rgba(51, 51, 51, 1);
        font-size: 12px;
        padding-top: 10px;
      }

      .content {
        p {
          padding-top: 20px;
          font-size: 14px;
          color: rgba(102, 102, 102, 1);
        }
      }

      .children {
        .title {
          padding-top: 20px;
        }
        ul {
          li {
            padding-top: 20px;
            list-style: default;
            list-style-type: disc;
            color: rgba(102, 102, 102, 1);
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>