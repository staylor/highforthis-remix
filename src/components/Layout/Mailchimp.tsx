export default function Mailchimp() {
  return (
    <section className="my-0 mx-auto">
      <style
        type="text/css"
        dangerouslySetInnerHTML={{
          __html: `
          .mc-field-group { display: inline-block; } /* positions input field horizontally */
          #mc_embed_signup label {display:block; font-size:16px; padding-bottom:10px; font-weight:bold;}
          #mc_embed_signup div#mce-responses {float:left; top:-1.4em; padding:0em .5em 0em .5em; overflow:hidden; width:90%;margin: 0 5%; clear: both;}
          #mc_embed_signup div.response {margin:1em 0; padding:1em .5em .5em 0; font-weight:bold; float:left; top:-1.5em; z-index:1; width:80%;}
          #mc_embed_signup #mce-error-response {display:none;}
          #mc_embed_signup #mce-success-response {color:#529214; display:none;}
          #mc_embed_signup label.error {display:block; float:none; width:auto; margin-left:1.05em; text-align:left; padding:.5em 0;}`,
        }}
      />
      <div id="mc_embed_signup" className="clear-left w-full py-2.5 text-center">
        <form
          action="https://highforthis.us19.list-manage.com/subscribe/post?u=885d793a2cc0087a39c93d292&amp;id=e68917f82e"
          method="post"
          id="mc-embedded-subscribe-form"
          name="mc-embedded-subscribe-form"
          className="validate"
          target="_blank"
          noValidate
        >
          <div id="mc_embed_signup_scroll">
            <input
              type="email"
              defaultValue=""
              name="EMAIL"
              className="border-box mb-1.5 mr-0 inline-block h-8 w-full rounded px-2 align-top text-base md:mb-0 md:mr-1.5 md:w-80"
              id="mce-EMAIL"
              placeholder="email address"
              required
            />
            <div className="absolute left-[-5000px]" aria-hidden="true">
              <input
                type="text"
                name="b_885d793a2cc0087a39c93d292_e68917f82e"
                tabIndex={-1}
                defaultValue=""
              />
            </div>
            <div className="block md:inline-block">
              <input
                type="submit"
                defaultValue="Subscribe"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="border-box bg-dark inline-block h-8 w-full cursor-pointer rounded px-4 text-sm leading-8 tracking-wide text-white transition-all hover:bg-black md:w-auto"
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
