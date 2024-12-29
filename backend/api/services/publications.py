from api.models import Publication


def like_publication(user, pub_id, liked):
    retweeted_publication = Publication.objects.get(id=pub_id)
    if not liked:
        user.retweets.add(retweeted_publication)
    else:
        user.retweets.remove(retweeted_publication)
    user.save()
    return not liked
