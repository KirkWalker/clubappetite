var { View } = require('react-native')

var DB = require('./DB');

var debug = true;
var SERVER_URL = 'http://appdev.appsolutemg.com/api.php';

module.exports = {

    getFaqPageData(_this) {

        DB.infopage.get({name: "faq"}, function(result){

            var initText = '';

            if(!result[0]){

                if(debug) { console.log("inserting faq data"); }



/*
                initText = {name: 'faq', text: `<h3>The standard Lorem Ipsum passage, used since the 1500s</h3>
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                <h3>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
                <p>"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"</p>
                <h3>1914 translation by H. Rackham</h3>
                <p>"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"</p>
                <h3>Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</h3>
                <p>"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."</p>
                <h3>1914 translation by H. Rackham</h3>
                <p>"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures,
                or else he endures pains to avoid worse pains."</p>`
                };

                replace with live pull from server
                http://appdev.appsolutemg.com/api.php?controller=api&action=infopage&name=faq
*/

                fetch(SERVER_URL + '?controller=api&action=infopage&name=faq', {
                    method: 'GET',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json',
                    }
                })
                .then((response) => response.json())
                .then((responseData) => {

                    if(responseData.result == 'error'){
                        console.log('User Class ERROR:',responseData);
                    } else {
                        if(responseData[0]){
                            initText = responseData[0];
                            DB.infopage.add(initText,function(result2){
                                if(debug) { console.log(result2) }
                                _this.setState({count: result2.totalrows, dataObj: result2, htmlText: initText.text});
                            });
                        } else {
                            console.log('responseData failed', responseData);
                        }
                    }
                })
                .catch(function(error) {
                    console.log('request failed', error);
                })
                .done();

            } else {

                initText = result[0];
                if(debug) { console.log(initText);}
                _this.setState({htmlText: initText.text});
                if(debug) { console.log("done!!!!");}
                if(debug) { console.log(_this.state);}

            }
        })


    },

    getTermPageData(_this) {
        DB.infopage.get({name: "terms"},function(result){
            if(!result[0]){ // user not in local datalayer

                if(debug) { console.log("inserting term data"); }

                var initText = {name: 'terms', text: `<p>Hello, and welcome to our Terms and Conditions of Use. This is important and affects your legal rights, so please read them and our Privacy Policy and other terms referenced in this document carefully. We hope you’re sitting comfortably and listening to some great music. Here we go…</p>
                <h4>1. Introduction</h4>

                <p>Thanks for choosing Spotify (“Spotify”, “we”, “us”, “our”). By signing up or otherwise using the Spotify service, websites, and software applications (together, the “Spotify Service” or “Service”), or accessing any content or material
                that is made available by Spotify through the Service (the “Content”)';
                you are entering into a binding contract with the Spotify entity indicated at the bottom of this document. The Spotify Service also includes the Spotify Support Community as further described in the Spotify Support Community section.</p>

                <p>The Spotify Service includes social and interactive features. Use of the Spotify Service relies on several technical requirements.</p>

                <p>Your agreement with us includes these Terms and Conditions of Use (“Terms”) and our Privacy Policy. (The Terms, Privacy Policy, and any additional terms that you agree to,
                as discussed in the Entire Agreement section, are referred to together as the “Agreements”.) If you wish to review the terms of the Agreements, the effective version of the Agreements can be found on Spotify’s website.
                You acknowledge that you have read and understood the Agreements, accept these Agreements, and agree to be bound by them. If you don’t agree with (or cannot comply with) the Agreements, then you may not use the Spotify Service or consume any Content.</p>

                <p>Please read the Agreements carefully. They cover important information about Spotify Services provided to you and any charges, taxes,
                and fees we bill you. The Agreements include information about future changes to the Agreements, export controls, automatic renewals, limitations of liability, privacy information,
                a class action waiver, and resolution of disputes by arbitration instead of in court.</p>';

                <p>Any information that you provided during sign-up can be corrected during the sign-up process by returning to the previous screens and correcting erroneous information.</p>

                <p>In order to use the Spotify Service and access the Content, you need to (1) be 18 or older, or be 13 or older and have your parent or guardian’s consent to the Agreements (except as set forth in the chart below), (2) have the power to enter a
                binding contract with us and not be barred from doing so under any applicable laws, and (3) be resident in a country where the Service is available. You also promise that any registration information that you submit to Spotify is true, accurate, and complete, and you agree to keep it that way at all times.</p>

                <p>If you are a resident of one of the following countries, reference this chart for your country-specific age
                restrictions:</p>`};

                DB.infopage.add(initText,function(result2){
                    if(debug) { console.log(result2); }
                    _this.setState({htmlText: initText.text});
               });
               if(debug) { console.log("done inserting data"); }

            } else {

                if(debug) { console.log("Term Rows found"); }

                initText = result[0];
                if(debug) { console.log(result); }
                _this.setState({htmlText: initText.text});

            }

        })
    },
    getFoodBankPageData(_this) {
        DB.infopage.get({name: "foodbank"},function(result){


            if(!result[0]){

                if(debug) { console.log("inserting foodbank data");}
                if(debug) { console.log(result);}
                var initText = {name: 'foodbank', text: `<p>Hello, and welcome to your food bank page.</p>`};

                DB.infopage.add(initText,function(result2){
                    console.log(result2);
                    _this.setState({htmlText: initText.text});
                });

                if(debug) { console.log("done inserting foodbank data");}

            } else {

                if(debug) { console.log("foodbank Rows found"); }
                initText = result[0];

                //DB.infopage.erase_db(function(removed_data){
                    //console.log("foodbank Rows REMOVED");
                    //console.log(removed_data);
                //})


                _this.setState({htmlText: initText.text});

            }

        })
    },




}