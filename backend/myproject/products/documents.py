# documents.py

from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Product
from categories.models import Category  # If you want to include category information in Elasticsearch

@registry.register_document
class ProductDocument(Document):
    category = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'name': fields.TextField(),
    })
    
    class Index:
        # Name of the Elasticsearch index
        name = 'products'
        # Store product information in Elasticsearch for fast querying
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 0
        }

    class Django:
        model = Product  # The model associated with this document
        
        # The fields that we want to store in Elasticsearch
        fields = [
            'id',
            'name',
            'no_of_units',
            'price',
            'discount_price',
        ]
        
        # Add additional fields related to the category.
        # We are creating a nested object here, you can extend this if needed.
        related_models = [Category]
        
    def get_category(self, obj):
        # Returning category fields for Elasticsearch document
        category = obj.category
        return {
            'id': category.id,
            'name': category.name
        }
