from django.db import migrations

def update_avatar_urls(apps, schema_editor):
    CustomUser = apps.get_model('api', 'User')
    for user in CustomUser.objects.all():
        if user.avatar and '/media/https%3A/encrypted-tbn0.gstatic.com/images%3Fq%3Dtbn%3AANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg%26s' in user.avatar.url:
            user.avatar.url = user.avatar.url.replace("/media/https%3A/encrypted-tbn0.gstatic.com/images%3Fq%3Dtbn%3AANd9GcT7gTERsv3nO-4I-R9C00Uor_m_nmxT0sE9Cg%26s",
                                                        '/media/avatars/default.jpg')
            user.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20240820_0852'),
    ]

    operations = [
        migrations.RunPython(update_avatar_urls),
    ]