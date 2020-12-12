const Phone = require('../models/phone');
const Review = require('../models/review');
const Comment = require('../models/comment');
const Reply = require('../models/reply');

function socket(io) {
 io.on('connection', socket => {

        socket.on('displayIndex', async function () {
/*const p = new Phone();
p.model= "Iphone 12 mini";
p.brand = 'Apple';
p.phoneImage='https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-family-select-2020?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;op_usm=0.5,0.5&amp;.v=1604343709000';
p.price=699;
p.launch={announced: '20/10/2020', realased: '30/10/2020'}
p.body={size: 6,
    type: 'Super alomed',
    resolution: '24001920',
    protection: 'Water'};
    p.memory = {ram: [5,10,25], rom: 16}
    p.camera = {MP: "4", p: "1600"}
    p.platform = {OS: "IOS 14", cpu: "3.6ghz", chipset: "A14", gpu: "gamer"}
    p.battery = {number: 1000, material: "Li-on"}
    p.save(function(err, p){
        if(err){
            console.log(err);

        }
        console.log(p);
    })*/
            const phones = await Review.find({}).limit(5).sort({ averageRating: -1 });
            const data = []
            for (var i = 0; i < phones.length; ++i) {
                const phone = await Phone.findOne({ _id: phones[i].phone });
                data.push(phone);
            }
            console.log(data);
            socket.emit('displayIndex', data);
        })
        socket.on('displayPhone', async function (phoneId) {
            const phone = await Phone.findOne({ _id: phoneId });
            const review = await Review.findOne({ phone: phoneId });
            const comments = await Comment.find({ review: review._id });
            const replies = [];
            for (var i = 0; i < comments.length; ++i) {

                const reply = await Reply.find({ comment: comments[i]._id });
                replies.push(reply);
            }
            console.log(phone, review, comments, replies);
            socket.emit('displayPhone', phone, review, comments, replies)
        })
        socket.on('ratePhone', async function(phoneId, number){
            var review = await Review.findOneAndUpdate({phone: phoneId}, {$push: {ratings: number}}, {new: true});
         sum = 0;
            for(i=0;i<review.ratings.length;++i){
sum = sum +review.ratings[i];
         }
         const average = (sum/review.ratings.length).toFixed(2);
         review = await Review.findOneAndUpdate({phone: phoneId}, {averageRating: average}, {new: true});
socket.emit('ratePhone', review);            
        })
        socket.on('addReply', function (text, authorName, comment) {
            const reply = new Reply();
            reply.comment = comment;
            reply.text = text;
            reply.authorName = authorName;
            reply.likes = 0;
            reply.dislikes = 0;
            reply.save(function (err, r) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("New reply saved");
                }
            })
            socket.emit('addReply', reply, comment)
        })
        socket.on('addComment', function (text, authorName, review) {
            const comment = new Comment();
            comment.review = review;
            comment.text = text;
            comment.authorName = authorName;
            comment.likes = 0;
            comment.dislikes = 0;
            comment.save(function (err, r) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('New comment saved');
                }
            })
            socket.emit('addComment', comment)
        })
socket.on('sortComments', async function(phoneID){
const review = await Review.findOne({phone: phoneID});
const comments = await Comment.find({review: review._id});
comments.sort((comment1, comment2)=>{return (comment2.likes - comment2.dislikes) - (comment1.likes - comment1.dislikes)});
const replies = [];
            for (var i = 0; i < comments.length; ++i) {

                const reply = await Reply.find({ comment: comments[i]._id });
                replies.push(reply);
            }
socket.emit('sortComments', comments, replies)
})

        socket.on('likeComment', async function (commentID) {
            const comment = await Comment.findOneAndUpdate({ _id: commentID }, { $inc: { likes: 1 } }, { new: true });
            console.log(comment.likes);
            socket.emit('likeComment', comment)

        })
        socket.on('dislikeComment', async function (commentID) {
            const comment = await Comment.findOneAndUpdate({ _id: commentID }, { $inc: { dislikes: 1 } }, { new: true })
            console.log(comment.dislikes);
            socket.emit('dislikeComment', comment)


        })
        socket.on('dislikeCommentCancel', async function (commentID) {
            const comment = await Comment.findOneAndUpdate({ _id: commentID }, { $inc: { dislikes: -1 } }, { new: true })
            console.log(comment.dislikes);

            socket.emit('dislikeCommentCancel', comment);
        })
        socket.on('likeCommentCancel', async function (commentID) {
            const comment = await Comment.findOneAndUpdate({ _id: commentID }, { $inc: { likes: -1 } }, { new: true })
            console.log(comment.likes);

            socket.emit('likeCommentCancel', comment)

        })


        socket.on('likeReply', async function (replyID) {
            const reply = await Reply.findOneAndUpdate({ _id: replyID }, { $inc: { likes: 1 } }, { new: true });
            console.log(reply.likes);
            socket.emit('likeReply', reply)

        })
        socket.on('dislikeReply', async function (replyID) {
            const reply = await Reply.findOneAndUpdate({ _id: replyID }, { $inc: { dislikes: 1 } }, { new: true })
            console.log(reply.dislikes);
            socket.emit('dislikeReply', reply)


        })
        socket.on('dislikeReplyCancel', async function (replyID) {
            const reply = await Reply.findOneAndUpdate({ _id: replyID }, { $inc: { dislikes: -1 } }, { new: true })
            console.log(reply.dislikes);

            socket.emit('dislikeReplyCancel', reply);
        })
        socket.on('likeReplyCancel', async function (replyID) {
            const reply = await Reply.findOneAndUpdate({ _id: replyID }, { $inc: { likes: -1 } }, { new: true })
            console.log(reply.likes);

            socket.emit('likeReplyCancel', reply)

        })

        socket.on('liveSearch', async function(se, id){
            console.log(se);
         /*   const phones = await Phone.find({model: {$regex: `.*${se}.*`}}).limit(4);*/
            const phones = await Phone.find({model: new RegExp(se)}).limit(4);
         
socket.emit('liveSearch', phones, id);
        })
        socket.on('displayCompare', async function(id, input){
            const phone = await Phone.findOne({_id: id});
            socket.emit('displayCompare', phone, input);
        })
        
    })
}

module.exports = socket