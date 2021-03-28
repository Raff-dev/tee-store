from django import forms
from .models import Product


class ProductForm(forms.ModelForm):
    variant_name = forms.CharField()
    image = forms.ImageField()

    class Meta:
        model = Product
        fields = '__all__'

    def save(self, commit=True):
        self.instance.variant_name = self.cleaned_data['variant_name']
        self.instance.image = self.cleaned_data['image']
        return super().save(commit=commit)
