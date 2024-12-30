from api.models import Publication


def like_publication(user, pub_id, liked):

    retweeted_publication = Publication.objects.get(id=pub_id)
    if not liked:
        print("asdas")
        user.likes.add(retweeted_publication)
        print("asdas")
    else:
        print("asdas")
        user.likes.remove(retweeted_publication)
    user.save()
    return liked
